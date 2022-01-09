import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import MemberRequest from './memberRequest.entity';

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

  async removeRequest(userId: number, requestId: number): Promise<boolean> {
    const memberRequest = await this.findOneById(requestId, {
      relations: ['requestedBy'],
    });

    if (!memberRequest) {
      throw new NotFoundException('Member request not found.');
    }

    if (memberRequest.requestedBy.id !== userId) {
      throw new UnauthorizedException(
        "Member request can be removed only by it's creator",
      );
    }

    await this.memberRequestRepository.remove(memberRequest);

    return true;
  }
}

export default MemberRequestService;
