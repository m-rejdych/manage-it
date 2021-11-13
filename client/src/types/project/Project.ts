import User from '../user';
import ProjectStage from '../projectStage';
import Tag from '../tag';
import Task from '../task';

export default interface Project {
  id: number;
  title: string;
  description: string | null;
  maxMembers: number;
  createdAt: Date;
  updatedAt: Date;
  creator?: User;
  members?: User[];
  admins?: User[];
  stage?: ProjectStage;
  tags?: Tag[];
  tasks?: Task[];
}
