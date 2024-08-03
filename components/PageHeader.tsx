import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function PageHeader({ className }: { className?: string }) {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href={"/dashboard"}
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Next Finance
      </Link>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
