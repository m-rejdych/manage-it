import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import ProjectService from './project.service';
import JwtGuard from '../../guards/jwt.guard';
import Project from './project.entity';
import CreateProjectDto from './dto/createProject.dto';
import { JwtAuthRequest } from '../auth/interfaces/authRequest';

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

  @UseGuards(JwtGuard)
  @Get('get-my-projects')
  async getMyProjects(@Req() req: JwtAuthRequest): Promise<Project[]> {
    const { userId } = req.user;

    return await this.projectService.findByMember(userId);
  }

  @UseGuards(JwtGuard)
  @Get('get-by-id/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Project> {
    const project = await this.projectService.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return project;
  }
}

export default ProjectController;
