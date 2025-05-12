export type UserRole = 'admin' | 'user';

export interface IUser {
  id: string,
  email: string,
  role: UserRole
}

export interface IAuthUser extends IUser {
  token: string
}

export interface IRegisterUser extends IUser {
  password: string
}
export interface ILoginUser extends Pick<IUser, 'email'> {
  password: string
}

