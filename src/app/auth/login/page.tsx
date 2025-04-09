import { LoginForm } from "@/app/_components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            href="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </Link>
        </p>
      </div>
      
      <LoginForm />
    </div>
  );
} 