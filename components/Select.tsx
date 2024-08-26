import React, { forwardRef, Ref, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: Ref<HTMLSelectElement>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    return (
      <select
        ref={ref}
        {...props}
        className="w-full rounded-md border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950"
      ></select>
    );
  },
);

export default Select;
