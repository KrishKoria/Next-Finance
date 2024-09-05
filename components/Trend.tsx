import { createClient } from "@/utils/supabase/server";
import Trends, { ColorType } from "./trends";

export default async function Trend({ type }: { type: ColorType }) {
  const supabase = createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
  });
  if (error) throw new Error("Could not fetch the trend data");
  const amount = data ?? 0;
  return <Trends type={type} amount={amount} prevAmount={amount - 500} />;
}
