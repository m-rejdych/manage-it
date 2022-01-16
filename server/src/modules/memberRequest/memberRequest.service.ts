import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import MemberRequest from './memberRequest.entity';
import User from '../user/user.entity';

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

  async findOneById(
    id: number,
    options?: FindOneOptions,
  ): Promise<MemberRequest | null> {
    const memberRequest = await this.memberRequestRepository.findOne(
      id,
      options,
    );

    return memberRequest || null;
  }

  async findOneByUserAndProjectId(
    userId: number,
    projectId: number,
    isAccepted?: boolean,
  ): Promise<MemberRequest | null> {
    let memberRequest = this.memberRequestRepository
      .createQueryBuilder('memberRequest')
      .leftJoin('memberRequest.requestedBy', 'requestedBy')
      .leftJoin('memberRequest.project', 'project')
      .where('requestedBy.id = :userId', { userId })
      .andWhere('project.id = :projectId', { projectId });

    if (isAccepted !== undefined) {
      memberRequest = memberRequest.andWhere(
        'memberRequest.isAccepted = :isAccepted',
        { isAccepted },
      );
    }

    return (await memberRequest.getOne()) ?? null;
  }

  async findAllByProjectId(
    projectId: number,
    isAccepted?: boolean,
  ): Promise<MemberRequest[] | null> {
    let memberRequests = this.memberRequestRepository
      .createQueryBuilder('memberRequest')
      .leftJoin('memberRequest.project', 'project')
      .leftJoinAndSelect('memberRequest.requestedBy', 'requestedBy')
      .leftJoinAndSelect('memberRequest.acceptedBy', 'acceptedBy')
      .where('project.id = :projectId', { projectId });

    if (isAccepted !== undefined) {
      memberRequests = memberRequests.andWhere(
        'memberRequest.isAccepted = :isAccepted',
        { isAccepted },
      );
    }

    return await memberRequests.getMany();
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

  async removeRequest(requestId: number): Promise<boolean> {
    const memberRequest = await this.findOneById(requestId);

    if (!memberRequest) {
      throw new NotFoundException('Member request not found.');
    }

    await this.memberRequestRepository.remove(memberRequest);

    return true;
  }

  async acceptRequest(
    requestId: number | MemberRequest,
    acceptedBy: User,
  ): Promise<MemberRequest> {
    const memberRequest =
      requestId instanceof MemberRequest
        ? requestId
        : await this.findOneById(requestId, { relations: ['acceptedBy'] });
    if (!memberRequest) {
      throw new NotFoundException('Member request not found.');
    }
    if (memberRequest.isAccepted) {
      throw new BadRequestException('This request is already accepted.');
    }

    memberRequest.isAccepted = true;
    memberRequest.acceptedBy = acceptedBy;

    await this.memberRequestRepository.save(memberRequest);

    return memberRequest;
  }
}

export default MemberRequestService;
