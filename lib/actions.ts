"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addTransactionSchema } from "./validations";

export async function createTransaction(formData: any) {
  const validated = addTransactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  const { error } = await createClient()
    .from("transactions")
    .insert(validated.data);
  if (error) {
    throw new Error("Failed creating the transaction");
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function fetchTransactions(range: string, offset = 0, limit = 10) {
  const supabase = createClient();
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}

export async function deleteTransaction(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}

export async function updateTransaction(id: number, formData: FormData) {
  const validated = addTransactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const { error } = await createClient()
    .from("transactions")
    .update(formData)
    .eq("id", id);

  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function login(_prevState: any, formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email")?.toString() || "";
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return {
      error: true,
      message: "Error authenticating!",
    };
  }
  return { message: `Email sent to ${email}` };
}

export async function GoogleAuth() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.DEPLOYMENT_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/dashboard");
}

export async function uploadAvatar(_prevState: any, formData: FormData) {
  const supabase = createClient();
  const file = formData.get("file");
  if (!file) {
    throw new Error("No file selected");
  }

  if (!(file instanceof File)) {
    throw new Error("Invalid file type. Please select a valid image.");
  }

  const fileExt = file.name.split(".").pop();

  if (!fileExt || !["png", "jpg", "jpeg"].includes(fileExt.toLowerCase())) {
    return {
      error: true,
      message: "Invalid file type. Please select a valid image.",
    };
  }

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  // Upload new avatar to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from("Avatars")
    .upload(fileName, file);

  if (uploadError) {
    return {
      error: true,
      message: "Error uploading avatar. Please try again.",
    };
  }

  // Fetch the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    return {
      error: true,
      message: "Failed to fetch user data. Please try again.",
    };
  }

  // Check if the user already has an avatar and remove it if exists
  const previousAvatar = userData.user.user_metadata?.avatar;

  if (previousAvatar) {
    const { error: removeError } = await supabase.storage
      .from("Avatars")
      .remove([previousAvatar]);

    if (removeError) {
      return {
        error: true,
        message: "Error removing previous avatar. Please try again.",
      };
    }
  }

  // Update the user's metadata with the new avatar
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });

  if (updateError) {
    return {
      error: true,
      message: "Error associating the avatar with the user. Please try again.",
    };
  }

  return {
    message: "User avatar updated successfully.",
  };
}

export async function updateSettings(_prevState: any, formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: formData.get("fullName"),
      defaultView: formData.get("defaultView"),
    },
  });

  if (error) {
    return {
      error: true,
      message: "Failed updating setting",
    };
  }

  return {
    message: "Updated user settings",
  };
}
