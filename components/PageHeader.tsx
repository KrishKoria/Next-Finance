import Link from "next/link";

export default function PageHeader({ className }: { className?: string }) {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href={"/dashboard"}
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Next Finance
      </Link>
      <div>User Dropdown</div>
    </header>
  );
}
