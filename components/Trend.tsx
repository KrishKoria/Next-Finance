import { createClient } from "@/utils/supabase/server";
import Trends, { ColorType } from "./trends";

export default async function Trend({
  type,
  range,
}: {
  type: ColorType;
  range: string;
}) {
  const supabase = createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
    range_arg: range,
  });
  if (error) throw new Error("Could not fetch the trend data");
  const amounts = data[0];

  return (
    <Trends
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount}
    />
  );
}
