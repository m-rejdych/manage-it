import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import MemberRequest from './memberRequest.entity';
import UserService from '../user/user.service';

@Injectable()
class MemberRequestService {
  constructor(
    @InjectRepository(MemberRequest)
    private memberRequestRepository: Repository<MemberRequest>,
  ) {}

  async createMemberRequest(): Promise<MemberRequest> {
    const memberRequest = this.memberRequestRepository.create();
    await this.memberRequestRepository.save(memberRequest);

    return memberRequest;
  }

  async findOneByUserAndProjectId(
    userId: number,
    projectId: number,
  ): Promise<MemberRequest | null> {
    const memberRequest = await this.memberRequestRepository
      .createQueryBuilder('memberRequest')
      .leftJoin('memberRequest.requestedBy', 'requestedBy')
      .leftJoin('memberRequest.project', 'project')
      .where('requestedBy.id = :userId', { userId })
      .andWhere('project.id = :projectId', { projectId })
      .getOne();

    return memberRequest ?? null;
  }

  async validateRequest(userId: number, projectId: number): Promise<boolean> {
    const isValid = !(await this.memberRequestRepository
      .createQueryBuilder('memberRequest')
      .leftJoin('memberRequest.requestedBy', 'requestedBy')
      .leftJoin('memberRequest.project', 'project')
      .where('requestedBy.id = :userId', { userId })
      .andWhere('project.id = :projectId', { projectId })
      .andWhere('memberRequest.isAccepted = :isAccepted', { isAccepted: false })
      .getOne());

    return isValid;
  }
}

export default MemberRequestService;
