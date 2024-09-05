import { z } from "zod";
import { categories, types } from "./consts";
type Category =
  | "Housing"
  | "Transport"
  | "Health"
  | "Food"
  | "Education"
  | "Other"
  | "None";
export const addTransactionSchema = z
  .object({
    type: z.enum(types),
    category: z.preprocess(
      (val: any) => (val?.length ? val : undefined),
      z.string().optional(),
    ),
    amount: z.coerce.number().min(1, {
      message: "Amount must be at least 1",
    }),
    description: z.string().optional(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date needs to contain a valid date",
    }),
  })
  .refine(
    (data) => {
      if (data.type === "Expense") {
        return (
          data.category !== undefined &&
          categories.includes(data.category as Category)
        );
      }
      return true;
    },
    {
      path: ["category"],
      message: "Category is required for expense transactions",
    },
  );

export type AddTransactionSchema = z.infer<typeof addTransactionSchema>;
