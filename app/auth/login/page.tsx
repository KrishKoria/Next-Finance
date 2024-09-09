"use client";
import LoginForm from "@/components/LoginForm";
import Separator from "@/components/seperator";
import SubmitButton from "@/components/SubmitButton";
import { GoogleAuth } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa6";

export default function LoginPage({ searchParams }: { searchParams: any }) {
  const router = useRouter();
  useEffect(() => {
    if (searchParams?.refresh) {
      router.replace("/auth/login");
      router.refresh();
    }
  }, [router, searchParams]);
  const handleGoogleAuth = async () => {
    await GoogleAuth();
  };
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 py-40 sm:w-[350px]">
      <div className="flex flex-col space-y-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email to sign in/create your account. No password is
          required.
        </p>
      </div>
      <div>
        <LoginForm />
      </div>
      <Separator />
      <SubmitButton onClick={handleGoogleAuth}>
        <FaGoogle className="mr-2" />
        Sign in with Google
      </SubmitButton>
    </div>
  );
}
