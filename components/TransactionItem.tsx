import { useFormatCurrency } from "@/hooks/formatCurrency";
import { HandCoins, Landmark, Pencil, PiggyBank, Wallet } from "lucide-react";
import DeleteItem from "./DeleteItem";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
type TransactionType = "Income" | "Expense" | "Savings" | "Investment";
export default function TransactionItem({
  type,
  description,
  amount,
  category,
  id,
  onRemoved,
}: {
  type: TransactionType;
  description: string;
  amount: number;
  category?: string;
  id: number;
  onRemoved: () => void;
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
    <div className="flex w-full items-center">
      <div className="mr-4 flex grow items-center">
        <IconComponent className={`mr-2 hidden h-4 w-4 sm:block ${colors}`} />
        <span>{description}</span>
      </div>
      <div className="hidden min-w-[150px] items-center md:flex">
        {category && (
          <div className="rounded-md bg-gray-700 px-2 py-0.5 text-xs text-gray-100 dark:bg-gray-100 dark:text-black">
            {category}
          </div>
        )}
      </div>
      <div className="min-w-[70px] text-right">{formatCurrency}</div>
      <div className="flex min-w-[100px] justify-end">
        <Link
          href={`/dashboard/transaction/${id}/edit`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <DeleteItem id={id} onRemoved={onRemoved} />
      </div>
    </div>
  );
}
