import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

export default function SubmitButton(
  props: React.ComponentProps<typeof Button>,
) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      {pending && <Loader className="h-4 w-4 animate-spin" />}
      {props.children}
    </Button>
  );
}
