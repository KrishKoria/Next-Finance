"use client";
import { updateSettings } from "@/lib/actions";
import { useFormState } from "react-dom";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";
import SubmitButton from "./SubmitButton";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import DateRangeSelect from "./RangeSelect";

const initialState = {
  message: "",
  error: false,
};

export default function SettingsForm({ defaults }: { defaults: any }) {
  const [state, formAction] = useFormState<any, any>(
    updateSettings,
    initialState,
  );
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label htmlFor="fullName">User full name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="User full name"
        defaultValue={defaults?.fullName}
      />

      <Label htmlFor="defaultView">Default transactions view</Label>
      <DateRangeSelect
        name="defaultView"
        id="defaultView"
        defaultValue={defaults?.defaultView}
      />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}
