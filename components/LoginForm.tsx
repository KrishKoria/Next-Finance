"use client";
import { login } from "@/lib/actions";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className="space-y-4">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <SubmitButton type="submit" size="sm" className="w-full">
        Sign in with email
      </SubmitButton>
      <p
        className={`${state?.error ? "text-red-500" : "text-green-500"} text-center text-sm`}
      >
        {state?.message}
      </p>
    </form>
  );
}
