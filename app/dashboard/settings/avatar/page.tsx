import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { uploadAvatar } from "@/lib/actions";

export default function AvatarPage() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Avatar</h1>
      <form className="space-y-4" action={uploadAvatar}>
        <Input type="file" name="file" id="file" />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
