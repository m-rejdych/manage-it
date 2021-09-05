export interface CreateProjectPayload {
  title: string;
  description: string;
  maxMembers?: number;
  tags?: string[];
}
