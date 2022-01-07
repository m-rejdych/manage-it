import Project from '../../../types/project';
import MemberRequest from '../../../types/memberRequest';

interface OpenedProject {
  project: Project | null;
  isMember: boolean;
  isAdmin: boolean;
  memberRequest: MemberRequest | null;
}

export interface State {
  projects: Project[];
  openedProject: OpenedProject;
  error: string | null;
  loading: boolean;
}
