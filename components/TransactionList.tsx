"use client";
import { useState } from "react";
import Separator from "./seperator";
import TransactionItem from "./TransactionItem";
import TransactionSummary from "./TransactionSummary";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import { fetchTransactions } from "@/lib/actions";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

export default function TransactionList({
  initialTransactions,
  range,
}: {
  initialTransactions: any;
  range: string;
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0,
  );
  const [loading, setLoading] = useState(false);
  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(transactions);
    setLoading(true);
    let nextTransactions: any[] = [];
    try {
      nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10,
      );
      setButtonHidden(nextTransactions.length === 0);
      setTransactions((prevTransactions: any[]) => [
        ...prevTransactions,
        ...nextTransactions,
      ]);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoved = (id: number) => () => {
    setTransactions((prev: any) => [...prev].filter((t) => t.id !== id));
  };
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummary date={date} amount={amount} />
          <Separator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem
                  {...transaction}
                  onRemoved={handleRemoved(transaction.id)}
                />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-white">
          No transactions found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
