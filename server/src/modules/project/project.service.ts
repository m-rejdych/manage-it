import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Project from './project.entity';
import UserService from '../user/user.service';
import CreateProjectDto from './dto/createProject.dto';

@Injectable()
class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  async createProject(
    data: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const project = this.projectRepository.create({
      ...data,
      creator: user,
      members: [user],
    });
    await this.projectRepository.save(project);

    return project;
  }

  async getProjectById(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne(id);

    return project || null;
  }
}

export default ProjectService;
