import { Role } from './role';

export class CustomerUser {
  userId: number;
  username: string;
  password: string;
  sirname: string;
  givenname: string;
  email: string;
  birthday: string;
  gender: string;
  mobile: string;
  enabled: number;
  roles: Array<Role>;
}
