import { useFormatCurrency } from "@/hooks/formatCurrency";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

type ColorType = "Revenue" | "Expense" | "Profit" | "Loss";

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
    Revenue: "text-green-700 dark:text-green-300",
    Expense: "text-red-700 dark:text-red-300",
    Profit: "text-green-700 dark:text-green-300",
    Loss: "text-red-700 dark:text-red-300",
  };
  const calcPercentage = (amount: number, prevAmount: number) => {
    if (!amount || !prevAmount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };
  const percentageChange = parseFloat(
    useMemo(
      () => calcPercentage(amount, prevAmount).toFixed(0),
      [amount, prevAmount]
    )
  );

  const formattedAmount = useFormatCurrency(amount);
  return (
    <div className="">
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
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
