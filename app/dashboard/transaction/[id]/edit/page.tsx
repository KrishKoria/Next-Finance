import AddTransactionForm from "@/components/AddTransactionForm";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Edit Transaction",
};
export default async function Page({ params }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) notFound();
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Edit Transaction</h1>
      <AddTransactionForm initialData={transaction} />
    </>
  );
}
