import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
);

const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

async function seed() {
  let transactions = [];

  for (let i = 0; i < 10; i++) {
    const created_at = faker.date.past();
    let type,
      category = null;

    const typeBias = Math.random();

    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["Savings", "Investment"]);
    }

    let amount;
    switch (type) {
      case "Income":
        amount = faker.number.int({
          min: 2000,
          max: 9000,
        });
        break;
      case "Expense":
        amount = faker.number.int({
          min: 10,
          max: 1000,
        });
        break;
      case "Investment":
      case "Saving":
        amount = faker.number.int({
          min: 3000,
          max: 10000,
        });
        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);

  if (error) {
    console.error("Error inserting data");
    console.log(error);
  } else {
    console.log("Data inserted");
  }
}

seed().catch(console.error);
