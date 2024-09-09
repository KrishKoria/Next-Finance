"use client";
import Select from "@/components/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DateRangeSelect from "./RangeSelect";

export default function Range({ defaultView }: { defaultView: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const range = searchParams.get("range") ?? defaultView ?? "last30days";

  const handleChange = (e: { target: { value: string } }) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return <DateRangeSelect value={range} onChange={handleChange} />;
}
