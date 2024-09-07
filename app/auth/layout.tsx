import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="absolute left-8 top-8">
        <Link
          href="/"
          className={`${buttonVariants({ variant: "ghost", size: "lg" })} flex items-center space-x-2 text-sm`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
}
