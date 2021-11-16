import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import Project from './project.entity';
import MemberRequest from '../memberRequest/memberRequest.entity';
import UserService from '../user/user.service';
import TagService from '../tag/tag.service';
import ProjectStageService from '../projectStage/projectStage.service';
import MemberRequestService from '../memberRequest/memberRequest.service';
import CreateProjectDto from './dto/createProject.dto';
import CreateMemberRequestDto from '../memberRequest/dto/CreateMemberRequest.dto';

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
    projectId: number,
    userId: number,
  ): Promise<boolean> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.members', 'member')
      .where('project.id = :projectId', { projectId })
      .andWhere('member.id = :userId', { userId })
      .getOne();

    return !!project;
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

  async search(value: string): Promise<Project[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .where('LOWER(project.title) LIKE LOWER(:value)', { value: `%${value}%` })
      .getMany();

    return projects;
  }

  async sendRequest(
    userId: number,
    { projectId }: CreateMemberRequestDto,
  ): Promise<MemberRequest> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const project = await this.findById(projectId, { relations: ['requests'] });
    if (!project) {
      throw new NotFoundException('Project not found!');
    }

    const isMember = await this.validateMembership(projectId, userId);
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
}

export default ProjectService;
