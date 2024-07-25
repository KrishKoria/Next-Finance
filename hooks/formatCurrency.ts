import { useMemo } from "react";

export const useFormatCurrency = (amount: number) => {
  const formattedCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return useMemo(() => formattedCurrency(amount), [amount]);
};
