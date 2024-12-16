import { UserData } from './UserData';

export interface TicketData {
  id: number ;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
  assignedUser: UserData | null;
  createdAt: Date ;
}
