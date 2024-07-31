import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectBox() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Location</SelectLabel>
          <SelectItem value="Warsaw">Warsaw</SelectItem>
          <SelectItem value="Berlin">Berlin</SelectItem>
          <SelectItem value="London">London</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
