import Project from '../../../types/project';
import MemberRequest from '../../../types/memberRequest';

interface AdminValues {
  memberRequests: MemberRequest[];
}

interface OpenedProject {
  project: Project | null;
  isMember: boolean;
  isAdmin: boolean;
  memberRequest: MemberRequest | null;
  admin: AdminValues | null;
}

export interface State {
  projects: Project[];
  openedProject: OpenedProject;
  error: string | null;
  loading: boolean;
}
