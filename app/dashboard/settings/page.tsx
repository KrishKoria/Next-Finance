import SettingsForm from "@/components/SettingsForm";
import { createClient } from "@/utils/supabase/server";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const defaults = user?.user_metadata || {};
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Settings</h1>
      <SettingsForm defaults={defaults} />
    </>
  );
}
