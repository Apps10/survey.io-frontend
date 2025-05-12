import axios from 'axios'
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toast'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Evita error "hooks fuera de componente", crea una función para usar desde React
export const setupInterceptors = (navigate: NavigateFunction) => {
  api.interceptors.response.use(
    res => res,
    err => {
      const status = err.response?.status;
      if (status === 401) {
        navigate('/auth/login');
      } else if (status === 429) {
        toast.error('Estás haciendo demasiadas peticiones. Intenta en unos minutos.');
      } else if (status >= 500) {
        toast.error('Error interno del servidor');
      }

      return Promise.reject(err);
    }
  );
};