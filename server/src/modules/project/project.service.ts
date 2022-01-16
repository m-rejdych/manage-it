import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import User from '../user/user.entity';
import Project from './project.entity';
import MemberRequest from '../memberRequest/memberRequest.entity';
import UserService from '../user/user.service';
import TagService from '../tag/tag.service';
import ProjectStageService from '../projectStage/projectStage.service';
import MemberRequestService from '../memberRequest/memberRequest.service';
import CreateProjectDto from './dto/createProject.dto';
import CreateMemberRequestDto from '../memberRequest/dto/createMemberRequest.dto';
import AcceptMemberRequestDto from '../memberRequest/dto/acceptMemberRequest.dto';

@Injectable()
class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userService: UserService,
    private tagService: TagService,
    private projectStageService: ProjectStageService,
    private memberRequestService: MemberRequestService,
  ) {}

  async createProject(
    { tags, ...rest }: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const stage = await this.projectStageService.findByName('preparation');
    if (!stage) {
      throw new NotFoundException('Project stage not found.');
    }

    const project = this.projectRepository.create({
      ...rest,
      stage,
      creator: user,
      members: [user],
      admins: [user],
    });

    if (tags?.length) {
      const projectTags = tags.map((name) =>
        this.tagService.findOrCreateTag(name),
      );

      const resolvedTags = await Promise.all(projectTags);

      project.tags = resolvedTags;
    }

    await this.projectRepository.save(project);

    return project;
  }

  async validateMembership(
    userId: number,
    projectId: number | Project,
  ): Promise<boolean> {
    let isMember = false;

    if (projectId instanceof Project) {
      const project = projectId;
      isMember = project.members?.some(({ id }) => id === userId);
    } else {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoin('project.members', 'member')
        .where('project.id = :projectId', { projectId })
        .andWhere('member.id = :userId', { userId })
        .getOne();
      isMember = !!project;
    }

    return !!isMember;
  }

  async validateAdmin(
    userId: number,
    projectId: number | Project,
  ): Promise<boolean> {
    let isAdmin = false;

    if (projectId instanceof Project) {
      const project = projectId;
      isAdmin = project.admins?.some(({ id }) => userId === id);
    } else {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoin('project.admins', 'admin')
        .leftJoin('project.members', 'member')
        .where('project.id = :projectId', { projectId })
        .andWhere('member.id = :userId', { userId })
        .andWhere('admin.id = :userId', { userId })
        .getOne();

      isAdmin = !!project;
    }

    return !!isAdmin;
  }

  async findById(
    id: number,
    options?: FindOneOptions,
  ): Promise<Project | null> {
    const project = await this.projectRepository.findOne(id, options);

    return project || null;
  }

  async findByMember(id: number): Promise<Project[]> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.members', 'member')
      .leftJoinAndSelect('project.stage', 'stage')
      .leftJoinAndSelect('project.creator', 'creator')
      .where('member.id = :id', { id })
      .orderBy('project.updatedAt', 'DESC')
      .getMany();

    return projects;
  }

  async getMembers(userId: number, projectId: number): Promise<User[]> {
    const project = await this.projectRepository.findOne(projectId, {
      relations: ['members'],
    });
    if (!(await this.validateMembership(userId, project))) {
      throw new ForbiddenException(
        'You need to be a member to see project members.',
      );
    }

    return project.members;
  }

  async search(value: string): Promise<Project[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .where('LOWER(project.title) LIKE LOWER(:value)', { value: `%${value}%` })
      .getMany();

    return projects;
  }

  async requestMembership(
    userId: number,
    { projectId }: CreateMemberRequestDto,
  ): Promise<MemberRequest> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const project = await this.findById(projectId, {
      relations: ['requests', 'members'],
    });
    if (!project) {
      throw new NotFoundException('Project not found!');
    }

    const isMember = await this.validateMembership(userId, project);
    if (isMember) {
      throw new BadRequestException('You are already member of this project.');
    }

    const isValidRequest = await this.memberRequestService.validateRequest(
      userId,
      projectId,
    );
    if (!isValidRequest) {
      throw new BadRequestException(
        'You have already requested to join this project.',
      );
    }

    const memberRequest = await this.memberRequestService.createMemberRequest();
    memberRequest.requestedBy = user;
    project.requests = [...project.requests, memberRequest];

    await this.projectRepository.save(project);

    return memberRequest;
  }

  async cancelMemberRequest(
    userId: number,
    requestId: number,
  ): Promise<boolean> {
    const memberRequest = await this.memberRequestService.findOneById(
      requestId,
      { relations: ['requestedBy'] },
    );
    if (!memberRequest) {
      throw new NotFoundException('Member request not found!');
    }
    if (memberRequest.requestedBy.id !== userId) {
      throw new ForbiddenException('You can only cancel your own requests.');
    }

    await this.memberRequestService.removeRequest(requestId);

    return true;
  }

  async rejectMemberRequest(
    adminId: number,
    requestId: number,
  ): Promise<boolean> {
    const memberRequest = await this.memberRequestService.findOneById(
      requestId,
      { relations: ['project', 'project.admins'] },
    );
    if (!memberRequest) {
      throw new NotFoundException('Member request not found!');
    }
    if (!(await this.validateAdmin(adminId, memberRequest.project))) {
      throw new ForbiddenException('Only admins can reject member requests.');
    }

    await this.memberRequestService.removeRequest(requestId);

    return true;
  }

  async acceptMemberRequest(
    adminId: number,
    { requestId }: AcceptMemberRequestDto,
  ): Promise<MemberRequest> {
    const memberRequest = await this.memberRequestService.findOneById(
      requestId,
      {
        relations: [
          'requestedBy',
          'project',
          'project.admins',
          'project.members',
        ],
      },
    );
    if (!memberRequest) {
      throw new NotFoundException('Memnber request not found.');
    }
    if (
      await this.validateMembership(
        memberRequest.requestedBy.id,
        memberRequest.project,
      )
    ) {
      throw new BadRequestException(
        'This user is already a member of this project.',
      );
    }

    const admin = memberRequest.project.admins.find(({ id }) => id === adminId);
    if (!admin) {
      throw new ForbiddenException('Only admins can accept member reqeusts.');
    }

    memberRequest.project.members = [
      ...memberRequest.project.members,
      memberRequest.requestedBy,
    ];
    await this.projectRepository.save(memberRequest.project);
    await this.memberRequestService.acceptRequest(memberRequest, admin);

    return memberRequest;
  }

  async getMemeberRequests(
    adminId: number,
    projectId: number,
    isAccepted?: boolean,
  ): Promise<MemberRequest[]> {
    const project = await this.projectRepository.findOne(projectId, {
      relations: ['admins'],
    });
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    if (!(await this.validateAdmin(adminId, project))) {
      throw new ForbiddenException(
        "Only admins can get project's member requests.",
      );
    }

    const memberRequests = await this.memberRequestService.findAllByProjectId(
      projectId,
      isAccepted,
    );

    return memberRequests;
  }

  async removeMember(
    memberId: number,
    adminId: number,
    projectId: number,
  ): Promise<Project> {
    const project = await this.findById(projectId, {
      relations: ['members', 'admins'],
    });
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    if (!(await this.validateMembership(memberId, project))) {
      throw new BadRequestException(
        'This user is not a member of this project.',
      );
    }
    if (!(await this.validateAdmin(adminId, project))) {
      throw new ForbiddenException('Only admins can remove members.');
    }

    project.members = project.members.filter(({ id }) => id !== memberId);
    await this.projectRepository.save(project);

    return project;
  }
}

export default ProjectService;
