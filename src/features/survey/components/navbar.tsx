import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/features/auth/hooks/auth.hook';
import { useEffect } from 'react';

export const Navbar = () => {
  const { authUser, isAuthenticated, logoutAction } = useAuth();
  useEffect(()=> {console.log(isAuthenticated, authUser)}, [isAuthenticated])

  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Survey.io</h1>
      <div className="flex items-center gap-4">
        { isAuthenticated && 
        <>
        <div className="flex items-center gap-2">
          
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${authUser?.email}`}
            />
            <AvatarFallback>
              {authUser?.email.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{authUser?.email}</span>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline" onClick={logoutAction}>
          Cerrar sesión
        </Button>
        </>
        }
      </div>
    </header>
  );
};
