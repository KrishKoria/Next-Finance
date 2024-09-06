export default function NotFound() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Transaction Not Found</h1>
      <p className="text-gray-400 dark:text-gray-500">
        The transaction could not be found or could not be fetched
      </p>
    </>
  );
}
