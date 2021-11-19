import User from '../user';
import Project from '../project';

export default interface MemberRequest {
  id: number; 
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  requestedBy?: User;
  acceptedBy?: User;
  project?: Project;
}
