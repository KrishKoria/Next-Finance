import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { createClient } from "@/utils/supabase/server";
import { Button, buttonVariants } from "./ui/button";
import { CircleUser, KeyRound } from "lucide-react";
import SignOutButton from "./SignOutButton";

export default async function PageHeader({
  className,
}: {
  className?: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <header className={`flex items-center justify-between ${className}`}>
      <Link
        href={"/dashboard"}
        className="text-xl decoration-2 underline-offset-8 hover:underline"
      >
        Next Finance
      </Link>
      <div className="flex items-center">
        <ModeToggle />
        {user && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <CircleUser className="h-6 w-6" />
            <span>{user?.email}</span>
          </Button>
        )}
        {user && <SignOutButton />}
        {!user && (
          <Link
            href="/auth/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <KeyRound className="h-6 w-6" />
          </Link>
        )}
      </div>
    </header>
  );
}
