import {
  Controller,
  Get,
  Post,
  UseGuards,
  ParseIntPipe,
  Body,
  Query,
  Req,
} from '@nestjs/common';

import TaskService from './task.service';
import JwtGuard from '../../guards/jwt.guard';
import Task from './task.entity';
import CreateTaskDto from './dto/createTask.dto';
import { JwtAuthRequest } from '../auth/interfaces/authRequest';

@Controller('task')
class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Get('get-by-id')
  async getById(
    @Req() req: JwtAuthRequest,
    @Query('taskId', new ParseIntPipe()) taskId: number,
    @Query('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<Task | null> {
    const { userId } = req.user;

    return await this.taskService.findById(taskId, userId, projectId);
  }

  @UseGuards(JwtGuard)
  @Post('create-task')
  async createTask(
    @Req() req: JwtAuthRequest,
    @Body() data: CreateTaskDto,
  ): Promise<Task> {
    const { userId } = req.user;

    return await this.taskService.createTask(userId, data);
  }

  @UseGuards(JwtGuard)
  @Get('get-by-project-id')
  async getByProjectId(
    @Query('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<Task[]> {
    return await this.taskService.findByProjectId(projectId);
  }
}

export default TaskController;
