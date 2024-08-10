import { categories, types } from "@/lib/consts";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { ItemSelect } from "./ItemSelect";

export default function AddTransactionForm() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Type
          </Label>
          <ItemSelect label="Type" items={types} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Category
          </Label>
          <ItemSelect label="Category" items={categories} />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Date
          </Label>
          <Input />
        </div>

        <div>
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Amount
          </Label>
          <Input type="number" />
        </div>

        <div className="col-span-2">
          <Label className="mb-1 block text-gray-700 dark:text-gray-300">
            Description
          </Label>
          <Input type="number" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
