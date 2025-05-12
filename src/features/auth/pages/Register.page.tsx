import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Registrar</h2>
        <RegisterForm />
      </div>
    </div>
  );
};
