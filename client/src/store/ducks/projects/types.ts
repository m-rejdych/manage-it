import Project from '../../../types/project';

export interface State {
  projects: Project[];
  openedProject: Project | null;
  error: string | null;
  loading: boolean;
}
