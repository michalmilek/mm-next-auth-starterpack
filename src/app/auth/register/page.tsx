import { RegisterForm } from "@/app/_components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
      
      <RegisterForm />
    </div>
  );
} 