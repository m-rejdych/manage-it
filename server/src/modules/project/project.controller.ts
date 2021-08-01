import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';

import ProjectService from './project.service';
import JwtGuard from '../../guards/jwt.guard';
import Project from './project.entity';
import CreateProjectDto from './dto/createProject.dto';
import { JwtAuthRequest } from '../auth/interfaces/auth-request';

@Controller('project')
class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtGuard)
  @Post('create-project')
  async createProject(
    @Body() data: CreateProjectDto,
    @Req() req: JwtAuthRequest,
  ): Promise<Project> {
    const { userId } = req.user;

    return await this.projectService.createProject(data, userId);
  }
}

export default ProjectController;
