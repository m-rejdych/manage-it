import Project from '../../../types/project';

export interface State {
  projects: Project[];
  error: string | null;
  loading: boolean;
}
