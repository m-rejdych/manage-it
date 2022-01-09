export interface CreateProjectPayload {
  title: string;
  description: string;
  maxMembers?: number;
  tags?: string[];
}

export interface GetMemberRequestsPayload {
  projectId: number;
  isAccepted?: boolean;
}
