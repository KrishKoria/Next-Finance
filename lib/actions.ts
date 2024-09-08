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
      redirectTo: "http://localhost:3000/auth/callback",
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

export async function uploadAvatar(formData: FormData) {
  const supabase = createClient();
  const file = formData.get("file");
  if (!file) {
    throw new Error("No file selected");
  }
  if (!(file instanceof File)) {
    throw new Error("Invalid file type");
  }
  const fileExt = file.name.split(".").pop();
  if (!fileExt) {
    throw new Error("Invalid file extension");
  }
  const fileName = `${Math.random()}.${fileExt}`;
  const { error } = await supabase.storage
    .from("Avatars")
    .upload(fileName, file);
  if (error) {
    throw new Error("Error uploading avatar");
  }
  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });
  if (dataUpdateError) {
    throw new Error("Error associating the avatar with the user");
  }
}
