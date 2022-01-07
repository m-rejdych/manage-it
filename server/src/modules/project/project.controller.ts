import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Body,
  Param,
  Query,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import ProjectService from './project.service';
import JwtGuard from '../../guards/jwt.guard';
import Project from './project.entity';
import CreateProjectDto from './dto/createProject.dto';
import CreateMemberRequestDto from '../memberRequest/dto/CreateMemberRequest.dto';
import MemberRequest from '../memberRequest/memberRequest.entity';
import MemberRequestService from '../memberRequest/memberRequest.service';
import { JwtAuthRequest } from '../auth/interfaces/authRequest';

@Controller('project')
class ProjectController {
  constructor(
    private projectService: ProjectService,
    private memberRequestService: MemberRequestService,
  ) {}

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
    const project = await this.projectService.findById(id, {
      relations: ['creator', 'stage', 'members', 'tags', 'admins'],
    });

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return project;
  }

  @UseGuards(JwtGuard)
  @Get('search-projects')
  async searchProjects(@Query('value') value: string): Promise<Project[]> {
    return await this.projectService.search(value);
  }

  @UseGuards(JwtGuard)
  @Get('validate-membership')
  async validateMembership(
    @Req() req: JwtAuthRequest,
    @Query('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<boolean> {
    const { userId } = req.user;

    return await this.projectService.validateMembership(projectId, userId);
  }

  @UseGuards(JwtGuard)
  @Get('validate-admin')
  async validateAdmin(
    @Req() req: JwtAuthRequest,
    @Query('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<boolean> {
    const { userId } = req.user;

    return await this.projectService.validateAdmin(userId, projectId);
  }

  @UseGuards(JwtGuard)
  @Post('member-request')
  async sendRequest(
    @Body() data: CreateMemberRequestDto,
    @Req() req: JwtAuthRequest,
  ): Promise<MemberRequest> {
    const { userId } = req.user;

    return await this.projectService.requestMembership(userId, data);
  }

  @UseGuards(JwtGuard)
  @Get('get-member-request')
  async checkMemberShipRequest(
    @Req() req: JwtAuthRequest,
    @Query('projectId', new ParseIntPipe()) projectId: number,
    @Query('isAccepted') isAccepted?: boolean,
  ): Promise<MemberRequest> {
    const { userId } = req.user;

    return await this.memberRequestService.findOneByUserAndProjectId(
      userId,
      projectId,
      isAccepted,
    );
  }

  @UseGuards(JwtGuard)
  @Delete('remove-member-request')
  async removeRequest(
    @Req() req: JwtAuthRequest,
    @Query('id', new ParseIntPipe()) id: number,
  ): Promise<boolean> {
    const { userId } = req.user;

    return await this.memberRequestService.removeRequest(userId, id);
  }
}

export default ProjectController;
