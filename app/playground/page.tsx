import { ModeToggle } from "@/components/ModeToggle";
import PageHeader from "@/components/PageHeader";
import { SelectBox } from "@/components/Select";
import Separator from "@/components/seperator";
import TransactionItem from "@/components/TransactionItem";
import TransactionSummary from "@/components/TransactionSummary";
import Trends from "@/components/trends";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PlaygroundPage() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">hello from playground!</h1>
      <div>
        <h2 className="mb-4 text-lg font-mono">Page Header</h2>
        <Separator />
        <div>
          <PageHeader />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Trends</h2>
        <Separator />
        <div className="flex space-x-4">
          <Trends type="Income" amount={1000} prevAmount={500} />
          <Trends type="Expense" amount={1000} prevAmount={500} />
          <Trends type="Savings" amount={1000} prevAmount={500} />
          <Trends type="Investment" amount={500} prevAmount={750} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction List</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={12000} />
          <TransactionItem
            type="Expense"
            category="Food"
            description="Outing"
            amount={1000}
          />
          <TransactionItem type="Savings" description="Family" amount={2000} />
          <TransactionItem
            type="Investment"
            description="Stock"
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">
          TransactionSummaryItem + TransactionItem
        </h2>
        <Separator />
        <div className="space-y-4">
          <TransactionSummary date="2024-05-01" amount={3500} />
          <Separator />
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem
            type="Expense"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Savings"
            description="For children"
            amount={500}
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Separator />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms</h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Your name</Label>
            <Input type="text" placeholder="Type something in here..." />
          </div>

          <div>
            <Label className="mb-1">Location</Label>
            <SelectBox />
          </div>

          <div className="flex items-center">
            <Checkbox id="terms" />
            <Label className="ml-2" htmlFor="terms">
              Accept terms
            </Label>
          </div>
        </div>
      </div>
    </main>
  );
}
