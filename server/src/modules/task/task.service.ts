import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TaskTypeService from '../taskType/taskType.service';
import TaskPriorityService from '../taskPriority/taskPriority.service';
import TagService from '../tag/tag.service';
import UserService from '../user/user.service';
import ProjectService from '../project/project.service';
import Task from './task.entity';
import CreateTaskDto from './dto/createTask.dto';

@Injectable()
class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService,
    private taskTypeService: TaskTypeService,
    private taskPriorityService: TaskPriorityService,
    private projectService: ProjectService,
    private tagService: TagService,
  ) {}

  async createTask(
    userId: number,
    { projectId, type, priority, assignedToId, tags, ...rest }: CreateTaskDto,
  ): Promise<Task> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const project = await this.projectService.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    const assignedTo = assignedToId
      ? await this.userService.findById(assignedToId)
      : null;
    if (!assignedTo && assignedToId) {
      throw new NotFoundException('Assigned to user not found.');
    }

    const taskType = await this.taskTypeService.findByName(type);
    if (!taskType) {
      throw new NotFoundException('Task type not found.');
    }

    const taskPriority = await this.taskPriorityService.findByName(priority);
    if (!taskPriority) {
      throw new NotFoundException('Task priority not found!');
    }

    const task = this.taskRepository.create({
      ...rest,
      creator: user,
      project,
      assignedTo,
      type: taskType,
      priority: taskPriority,
    });

    if (tags) {
      const taskTags = tags.map((name) =>
        this.tagService.findOrCreateTag(name),
      );

      const resolvedTags = await Promise.all(taskTags);

      task.tags = resolvedTags;
    }

    await this.taskRepository.save(task);

    return task;
  }

  async findById(id: number): Promise<Task | null> {
    const task = this.taskRepository.findOne(id);

    return task || null;
  }
}

export default TaskService;
