import { fetchTransactions } from "@/lib/actions";
import TransactionList from "./TransactionList";

export default async function TransactionListWrapper({
  range,
}: {
  range: string;
}) {
  const transactions = await fetchTransactions(range);
  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
}
    