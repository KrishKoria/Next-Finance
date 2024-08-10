import { useFormatCurrency } from "@/hooks/formatCurrency";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

export type ColorType = "Income" | "Expense" | "Savings" | "Investment";

export default function Trends({
  type,
  amount,
  prevAmount,
}: {
  type: ColorType;
  amount: number;
  prevAmount: number;
}) {
  const colorClasses = {
    Income: "text-green-700 dark:text-green-300",
    Expense: "text-red-700 dark:text-red-300",
    Savings: "text-yellow-700 dark:text-yellow-300",
    Investment: "text-blue-700 dark:text-blue-300",
  };
  const calcPercentage = (amount: number, prevAmount: number) => {
    if (!amount || !prevAmount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };
  const percentageChange = parseFloat(
    useMemo(
      () => calcPercentage(amount, prevAmount).toFixed(0),
      [amount, prevAmount],
    ),
  );

  const formattedAmount = useFormatCurrency(amount);
  return (
    <div className="">
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="mb-2 text-2xl font-semibold text-black dark:text-white">
        {formattedAmount}
      </div>
      <div className="flex items-center space-x-1 text-sm">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        <div>{percentageChange}% vs last period</div>
      </div>
    </div>
  );
}
