import { RegisterForm } from "@/app/_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>
      
      <RegisterForm />
    </div>
  );
} 