import { api } from "@/api/axios.service";

export const userService = {
  async login(email: string, password: string) {
    const response = await api.post(`/users/login`, {
      email,
      password,
    });
    return response.data;
  },

  async register(email: string, password: string) {
    const response = await api.post(`/users/register`, {
      email,
      password,
    });
    return response.data;
  },
};
