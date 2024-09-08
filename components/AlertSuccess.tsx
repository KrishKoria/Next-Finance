import { Check } from "lucide-react";
import Alert from "./Alert";

export default function AlertSuccess({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Alert
      icon={<Check className="h-6 w-6 text-green-700 dark:text-green-300" />}
      title={
        <span className="text-green-700 dark:text-green-300">Success</span>
      }
    >
      <span className="text-green-700 dark:text-green-300">{children}</span>
    </Alert>
  );
}
