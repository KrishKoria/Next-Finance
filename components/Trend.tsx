import Trends, { ColorType } from "./trends";

export default async function Trend({ type }: { type: ColorType }) {
  const response = await fetch(`http://localhost:3100/trends/${type}`);
  const { amount, prevAmount } = await response.json();
  return <Trends type={type} amount={amount} prevAmount={prevAmount} />;
}
