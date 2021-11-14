import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TaskTypeService from '../taskType/taskType.service';
import TaskPriorityService from '../taskPriority/taskPriority.service';
import TaskStageService from '../taskStage/taskStage.service';
import TagService from '../tag/tag.service';
import UserService from '../user/user.service';
import ProjectService from '../project/project.service';
import CheckpointService from '../checkpoint/checkpoint.service';
import Task from './task.entity';
import CreateTaskDto from './dto/createTask.dto';

@Injectable()
class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService,
    private taskTypeService: TaskTypeService,
    private taskPriorityService: TaskPriorityService,
    private taskStageService: TaskStageService,
    private projectService: ProjectService,
    private tagService: TagService,
    private checkpointService: CheckpointService,
  ) {}

  async createTask(
    userId: number,
    {
      projectId,
      type,
      priority,
      assignedToId,
      tags,
      checkpoints,
      ...rest
    }: CreateTaskDto,
  ): Promise<Task> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isMember = await this.projectService.validateMembership(
      projectId,
      userId,
    );

    if (!isMember) {
      throw new UnauthorizedException('You must be a member to add tasks.');
    }

    const project = await this.projectService.findById(projectId);

    const assignedTo = assignedToId
      ? await this.userService.findById(assignedToId)
      : null;

    if (!assignedTo && assignedToId) {
      throw new NotFoundException('Assignee user not found.');
    }

    const isAssignedMember = assignedTo
      ? await this.projectService.validateMembership(projectId, assignedToId)
      : true;

    if (!isAssignedMember) {
      throw new UnauthorizedException('Assignee must be a member of project.');
    }

    const taskType = await this.taskTypeService.findByName(type);
    if (!taskType) {
      throw new NotFoundException('Task type not found.');
    }

    const taskPriority = await this.taskPriorityService.findByName(priority);
    if (!taskPriority) {
      throw new NotFoundException('Task priority not found.');
    }

    const taskStage = await this.taskStageService.findByName('open');
    if (!taskStage) {
      throw new NotFoundException('Task stage not found.');
    }

    const addedCheckpoints = checkpoints.map((checkpoint) =>
      this.checkpointService.createCheckpoint(userId, checkpoint),
    );
    const resolvedCheckpoints = await Promise.all(addedCheckpoints);

    const task = this.taskRepository.create({
      ...rest,
      creator: user,
      project,
      assignedTo,
      type: taskType,
      priority: taskPriority,
      stage: taskStage,
      checkpoints: resolvedCheckpoints,
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

  async findByProjectId(projectId: number): Promise<Task[]> {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.project', 'project')
      .leftJoinAndSelect('task.creator', 'creator')
      .leftJoinAndSelect('task.stage', 'stage')
      .where('project.id = :projectId', { projectId })
      .orderBy('project.updatedAt', 'DESC')
      .getMany();

    return tasks;
  }
}

export default TaskService;
