import { createClient } from "@/utils/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width = 32, height = 32 }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if the user has an avatar in Supabase storage
  if (user?.user_metadata?.avatar) {
    const { data: imageData, error } = await supabase.storage
      .from("Avatars")
      .createSignedUrl(user.user_metadata.avatar, 60 * 5);

    if (!error) {
      return (
        <Image
          src={imageData.signedUrl}
          width={width}
          height={height}
          alt="User avatar"
          className="rounded-full"
        />
      );
    }
  }

  // Fallback to Google avatar if available
  if (
    user?.user_metadata?.provider === "google" &&
    user.user_metadata.avatar_url
  ) {
    return (
      <Image
        src={user.user_metadata.avatar_url}
        width={width}
        height={height}
        alt="User avatar"
        className="rounded-full"
      />
    );
  }

  // Default avatar if no avatar is found
  return <CircleUser className="h-6-6" />;
}
