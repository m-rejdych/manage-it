import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Project from './project.entity';
import UserService from '../user/user.service';
import TagService from '../tag/tag.service';
import ProjectStageService from '../projectStage/projectStage.service';
import CreateProjectDto from './dto/createProject.dto';

@Injectable()
class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userService: UserService,
    private tagService: TagService,
    private projectStageService: ProjectStageService,
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

  async findById(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne(id);

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
      .getMany();

    return projects;
  }
}

export default ProjectService;
