import Separator from "./seperator";
import TransactionItem from "./TransactionItem";
import TransactionSummary from "./TransactionSummary";

type Transaction = {
  id: number;
  type: "Income" | "Expense" | "Savings" | "Investment";
  category: string;
  description: string;
  amount: number;
  created_at: string;
};

const groupAndSumTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: {
    [key: string]: { transactions: Transaction[]; amount: number };
  } = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  }
  return grouped;
};

export default async function TransactionList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    {
      next: {
        tags: ["transaction-list"],
      },
    },
  );

  const transactions: Transaction[] = await response.json();
  const grouped = groupAndSumTransactionsByDate(transactions);
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummary date={date} amount={amount} />
          <Separator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}
