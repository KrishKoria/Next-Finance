import PageHeader from "@/components/PageHeader";
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
          <Trends type="Revenue" amount={1000} prevAmount={500} />
          <Trends type="Expense" amount={1000} prevAmount={500} />
          <Trends type="Profit" amount={1000} prevAmount={500} />
          <Trends type="Loss" amount={1000} prevAmount={500} />
        </div>
      </div>
    </main>
  );
}
