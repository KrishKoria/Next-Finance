"use client";
import Alert from "@/components/Alert";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { uploadAvatar } from "@/lib/actions";
import { Ban, Check } from "lucide-react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: false,
};

export default function AvatarPage() {
  const [state, formAction] = useFormState<any, any>(
    uploadAvatar,
    initialState,
  );
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Avatar</h1>
      <form className="space-y-4" action={formAction}>
        {state?.error && (
          <Alert
            icon={<Ban className="h-6 w-6 text-red-700 dark:text-red-300" />}
            title={
              <span className="text-red-700 dark:text-red-300">Error</span>
            }
          >
            <span className="text-red-700 dark:text-red-300">
              {state?.message}
            </span>
          </Alert>
        )}
        {!state?.error && state?.message.length > 0 && (
          <Alert
            icon={
              <Check className="h-6 w-6 text-green-700 dark:text-green-300" />
            }
            title={
              <span className="text-green-700 dark:text-green-300">
                Success
              </span>
            }
          >
            <span className="text-green-700 dark:text-green-300">
              {state?.message}
            </span>
          </Alert>
        )}
        <Input type="file" name="file" id="file" />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
