import PageHeader from "@/components/PageHeader";
import TransactionItem from "@/components/TransactionItem";
import Trends from "@/components/trends";

export default function PlaygroundPage() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">hello from playground!</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Page Header</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="">
          <PageHeader />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Trends</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="flex space-x-4">
          <Trends type="Income" amount={1000} prevAmount={500} />
          <Trends type="Expense" amount={1000} prevAmount={500} />
          <Trends type="Savings" amount={1000} prevAmount={500} />
          <Trends type="Investment" amount={500} prevAmount={750} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction List</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionItem type="Income" desc="Salary" amount={12000} />
          <TransactionItem
            type="Expense"
            category="Food"
            desc="Outing"
            amount={1000}
          />
          <TransactionItem type="Savings" desc="Family" amount={2000} />
          <TransactionItem type="Investment" desc="Stock" amount={9000} />
        </div>
      </div>
    </main>
  );
}
