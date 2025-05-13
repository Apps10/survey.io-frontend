import { useState } from 'react';
import { Input, Button, Label } from '@/components/ui';
import { userService } from '../services/user.service';
import { useAuth } from '../hooks/auth.hook';
import { setupInterceptors } from '@/api/axios.service';
import { useNavigate } from 'react-router-dom';
import { generateId } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserRole } from '../interfaces/user.interface';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuthUserAction } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await userService().register({
        email,
        password,
        id: generateId(),
        role,
      });

      setupInterceptors(navigate);
      setAuthUserAction({
        email: data.user.email,
        id: data.user.id,
        role: data.user.role,
        token: data.token,
      });

      navigate('/surveys');
    } catch (err: any) {
      console.log(err);
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Rol</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem onClick={() => setRole('user')} value="user">
              User
            </SelectItem>
            <SelectItem onClick={() => setRole('admin')} value="admin">
              Admin
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label onClick={() => navigate('/auth/login')}>
          Ya tienes una cuenta?
        </Label>
      </div>
      <Button type="submit">registrar</Button>
    </form>
  );
};
