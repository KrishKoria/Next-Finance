"use client";
import { categories, types } from "@/lib/consts";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Select from "./Select";
import { useForm } from "react-hook-form";

type Inputs = {
  type: string;
  category: string;
  created_at: string;
  amount: number;
  description: string;
};

export default function AddTransactionForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => console.log(data);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Type
          </Label>
          <Select {...register("type")}>
            {types.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Category
          </Label>
          <Select {...register("category")}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Date
          </Label>
          <Input {...register("created_at")} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Amount
          </Label>
          <Input type="number" {...register("amount")} />
        </div>

        <div className="col-span-2">
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Description
          </Label>
          <Input {...register("description")} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
