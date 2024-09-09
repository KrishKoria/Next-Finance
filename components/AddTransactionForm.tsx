"use client";
import { categories, types } from "@/lib/consts";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTransactionSchema, AddTransactionSchema } from "@/lib/validations";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import FormError from "./Error";
import { createTransaction, updateTransaction } from "@/lib/actions";
import { format } from "date-fns";
type EditTransaction = AddTransactionSchema & { id: number };
export default function AddTransactionForm({
  initialData,
}: {
  initialData?: EditTransaction;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onTouched",
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
  });
  const [saving, setSaving] = useState(false);
  const type = watch("type");
  const [lastError, setLastError] = useState<Error | undefined>();
  const editing = Boolean(initialData);
  const onSubmit = async (data: any) => {
    setSaving(true);
    setLastError(undefined);
    try {
      if (editing) {
        await updateTransaction(initialData!.id, data);
      } else {
        await createTransaction(data);
      }
    } catch (error: any) {
      setLastError(error?.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Type
          </Label>
          <Select
            {...register("type", {
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                if (e.target.value !== "Expense") {
                  setValue("category", "None");
                }
              },
            })}
          >
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
          <FormError error={errors.type?.message} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Category
          </Label>
          <Select {...register("category")} disabled={type !== "Expense"}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          <FormError error={errors.category?.message} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Date
          </Label>
          <Input
            {...register("created_at")}
            defaultValue={format(new Date(), "yyyy-MM-dd")}
            disabled={editing}
          />
          <FormError error={errors.created_at?.message} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Amount
          </Label>
          <Input
            type="number"
            defaultValue={0}
            {...register("amount", { valueAsNumber: true })}
          />
          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Description
          </Label>
          <Input {...register("description")} />
          <FormError error={errors.description?.message} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>{lastError && <FormError error={lastError} />}</div>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
}
