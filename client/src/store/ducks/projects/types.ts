import Project from '../../../types/project';

interface OpenedProject {
  project: Project | null;
  isMember: boolean;
}

export interface State {
  projects: Project[];
  openedProject: OpenedProject;
  error: string | null;
  loading: boolean;
}
