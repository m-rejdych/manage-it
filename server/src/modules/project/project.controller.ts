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
  UnauthorizedException,
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
  async getById(
    @Req() req: JwtAuthRequest,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Project> {
    const { userId } = req.user;

    const isMember = await this.projectService.validateMembership(id, userId);

    if (!isMember) {
      throw new UnauthorizedException(
        'You must be a member to see project details.',
      );
    }

    const project = await this.projectService.findById(id, {
      relations: ['creator', 'stage', 'members', 'tags', 'admins'],
    });

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return project;
  }
}

export default ProjectController;
