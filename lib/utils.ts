import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Transaction = {
  id: number;
  type: "Income" | "Expense" | "Savings" | "Investment";
  category: string;
  description: string;
  amount: number;
  created_at: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupAndSumTransactionsByDate = (transactions: Transaction[]) => {
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
