import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Project from './project.entity';
import UserService from '../user/user.service';
import TagService from '../tag/tag.service';
import CreateProjectDto from './dto/createProject.dto';

@Injectable()
class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  async createProject(
    { tags, ...rest }: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const project = this.projectRepository.create({
      ...rest,
      creator: user,
      members: [user],
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
}

export default ProjectService;
