export default function FormError({ error }: { error: any }) {
  if (!error || typeof error !== "string") return null;

  return <p className="mt-1 text-red-500">{error}</p>;
}
