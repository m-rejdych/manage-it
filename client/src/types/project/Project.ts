import User from '../user';

export default interface Project {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  creator?: User;
  members: User[];
}
