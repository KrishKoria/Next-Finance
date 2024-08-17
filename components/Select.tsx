import { forwardRef, Ref } from "react";

export default forwardRef(function Select(props, ref: Ref<HTMLSelectElement>) {
  return (
    <select
      ref={ref}
      {...props}
      className="w-full rounded-md border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950"
    ></select>
  );
});
