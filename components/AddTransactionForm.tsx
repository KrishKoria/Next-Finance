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
import { CalendarIcon, Loader2 } from "lucide-react";
import FormError from "./Error";
import { createTransaction, updateTransaction } from "@/lib/actions";
import { format, parseISO } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

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
    trigger,
    formState: { errors },
    reset,
  } = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onTouched",
    defaultValues: initialData ?? {
      created_at: format(new Date(), "yyyy-MM-dd") || "",
    },
  });
  console.log(errors);
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    initialData ? parseISO(initialData.created_at) : undefined,
  );
  const [lastError, setLastError] = useState<Error | undefined>();

  const type = watch("type");
  const editing = Boolean(initialData);

  const onSubmit = async (data: any) => {
    setSaving(true);
    setLastError(undefined);
    try {
      if (editing) {
        await updateTransaction(initialData!.id, data);
      } else {
        await createTransaction(data);
        reset();
      }
    } catch (error: any) {
      setLastError(error?.message || "An unexpected error occurred");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "";
    setValue("created_at", formattedDate);
    trigger("created_at");
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
          <Popover {...register("created_at")}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
          <FormError error={errors.amount?.message} />
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
