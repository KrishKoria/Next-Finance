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
import { useRouter } from "next/navigation";
import { purgeTransactionListCache } from "@/lib/actions";
import FormError from "./Error";

export default function AddTransactionForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onTouched",
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          created_at: `${data.created_at}T00:00:00`,
        }),
      });
      await purgeTransactionListCache();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
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
          <Select {...register("type")}>
            {types.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          <FormError error={errors.type} />
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
          <FormError error={errors.category} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Date
          </Label>
          <Input {...register("created_at")} />
          <FormError error={errors.created_at} />
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
          <FormError error={errors.description} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
}
