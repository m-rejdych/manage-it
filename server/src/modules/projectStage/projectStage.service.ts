import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProjectStage from './projectStage.entity';
import ProjectStageName from './interfaces/projectStageName';

@Injectable()
class ProjectStageService {
  constructor(
    @InjectRepository(ProjectStage)
    private projectStageRepository: Repository<ProjectStage>,
  ) {}

  async findByName(name: ProjectStageName): Promise<ProjectStage> {
    const projectStageName = await this.projectStageRepository.findOne({
      name,
    });

    if (!projectStageName) {
      throw new NotFoundException('Project stage not found!');
    }

    return projectStageName;
  }
}

export default ProjectStageService;
