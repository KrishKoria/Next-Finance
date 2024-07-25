import { useFormatCurrency } from "@/hooks/formatCurrency";
import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";
type TransactionType = "Income" | "Expense" | "Savings" | "Investment";
export default function TransactionItem({
  type,
  desc,
  amount,
  category,
}: {
  type: TransactionType;
  desc: string;
  amount: number;
  category?: string;
}) {
  const formatCurrency = useFormatCurrency(amount);
  const iconMap = {
    Income: {
      icon: HandCoins,
      color: "text-green-500 dark:text-green-400",
    },
    Expense: {
      icon: Wallet,
      color: "text-red-500 dark:text-red-400",
    },
    Savings: {
      icon: PiggyBank,
      color: "text-indigo-500 dark:text-indigo-400",
    },
    Investment: {
      icon: Landmark,
      color: "text-yellow-500 dark:text-yellow-400",
    },
  };

  const IconComponent = iconMap[type].icon;
  const colors = iconMap[type].color;
  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <IconComponent className={`mr-2 w-4 h-4 hidden sm:block ${colors}`} />
        <span>{desc}</span>
      </div>
      <div className="min-w-[150px] items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black py-0.5 px-2">
            {category}
          </div>
        )}
      </div>
      <div className="min-w-[70px] text-right">{formatCurrency}</div>
      <div className="min-w-[50px] flex justify-end">...</div>
    </div>
  );
}
