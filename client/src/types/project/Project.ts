import User from '../user';
import ProjectStage from '../projectStage';
import Tag from '../tag';

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
  // Replace string with Task interface later
  tasks?: string[];
}
