import {UserRole} from "./user-role.enum";

export interface User {
  id: string;
  name: string;
  email: string;
  userRole: UserRole;
}
