"use client";
import { signOut } from "@/lib/actions";
import { LogOut } from "lucide-react";
import SubmitButton from "./SubmitButton";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="h-6 w-6" />
      </SubmitButton>
    </form>
  );
}
