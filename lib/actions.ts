"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransaction(formData: any) {
  // Handle errors
  // Validate data
  const { error } = await createClient().from("transactions").insert(formData);
  if (error) {
    throw new Error("Failed creating the transaction");
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
