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
