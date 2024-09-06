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
