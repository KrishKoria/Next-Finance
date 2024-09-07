import { login } from "@/lib/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm() {
  return (
    <form action={login} className="space-y-4">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <Button type="submit" size="sm" className="w-full">
        Sign in with email
      </Button>
    </form>
  );
}
