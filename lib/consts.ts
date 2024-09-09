export const types = ["Income", "Expense", "Investment", "Savings"] as const;
export const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
  "None",
] as const;

export type Category =
  | "Housing"
  | "Transport"
  | "Health"
  | "Food"
  | "Education"
  | "Other"
  | "None";

export const dateRangeOptions = [
  "last24hours",
  "last7days",
  "last30days",
  "last12months",
] as const;
