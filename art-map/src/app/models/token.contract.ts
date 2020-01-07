import { UserRole } from "./user-role.enum";

export interface TokenContract {
  userId: string;
  userName: string;
  accessToken: string;
  email: string;
  userRole: UserRole;
}
