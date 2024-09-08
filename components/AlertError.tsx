import { Ban } from "lucide-react";
import Alert from "./Alert";

export default function AlertError({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Alert
      icon={<Ban className="h-6 w-6 text-red-700 dark:text-red-300" />}
      title={<span className="text-red-700 dark:text-red-300">Error</span>}
    >
      <span className="text-red-700 dark:text-red-300">{children}</span>
    </Alert>
  );
}
