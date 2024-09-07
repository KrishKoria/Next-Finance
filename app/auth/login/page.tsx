import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
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
    </div>
  );
}
