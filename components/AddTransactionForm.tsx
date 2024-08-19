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
  } = useForm<Inputs>({
    mode: "onTouched",
  });

  const onSubmit = (data: any) => console.log(data);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Type
          </Label>
          <Select
            {...register("type", {
              required: "Please select the type of transaction",
            })}
          >
            {types.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          {errors.type && (
            <p className="mt-1 text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Category
          </Label>
          <Select
            {...register("category", { required: "Please choose a category" })}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          {errors.category && (
            <p className="mt-1 text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Date
          </Label>
          <Input
            {...register("created_at", { required: "Please Enter a Date" })}
          />
          {errors.created_at && (
            <p className="mt-1 text-red-600">{errors.created_at.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Amount
          </Label>
          <Input
            type="number"
            {...register("amount", {
              required: "Please Enter an Amount",
              min: { value: 1, message: "Amount must be greater than 0" },
              valueAsNumber: true,
            })}
          />
          {errors.amount && (
            <p className="mt-1 text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Description
          </Label>
          <Input
            {...register("description", {
              required: "Please enter a description",
            })}
          />
          {errors.description && (
            <p className="mt-1 text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
