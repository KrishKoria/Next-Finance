import { createClient } from "@/utils/supabase/server";
import Separator from "./seperator";
import TransactionItem from "./TransactionItem";
import TransactionSummary from "./TransactionSummary";
import { groupAndSumTransactionsByDate } from "@/lib/utils";

export default async function TransactionList({ range }: { range: string }) {
  const supabase = createClient();
  let { data: transactions, error } = await supabase.rpc("fetch_transactions", {
    // limit_arg,
    // offset_arg,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  const grouped = groupAndSumTransactionsByDate(transactions!);
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
