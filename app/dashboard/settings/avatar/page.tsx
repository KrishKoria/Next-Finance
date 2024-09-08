"use client";
import AlertError from "@/components/AlertError";
import AlertSuccess from "@/components/AlertSuccess";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { uploadAvatar } from "@/lib/actions";
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
        {state?.error && <AlertError>{state?.message}</AlertError>}
        {!state?.error && state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}
        <Input type="file" name="file" id="file" />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
