import type { ILoginUser, IRegisterUser } from '../interfaces/user.interface';
import { api } from '@/api/axios.service';

export const userService = () => {

  async  function  login({ email, password }: ILoginUser) {
    const response = await api.post(`/users/login`, {
      email,
      password,
    });

    return response.data;
  }

  async function register(dto: IRegisterUser) {
    const response = await api.post(`/users/register`, {
      ...dto
    });
    return response.data;
  }

  return { login, register };
};