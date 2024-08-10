import AddTransactionForm from "@/components/AddTransactionForm";

export const metadata = {
  title: "Add Transaction",
};
export default function AddTransaction() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Add Transaction</h1>
      <AddTransactionForm />
    </>
  );
}
