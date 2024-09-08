export default function Alert({
  title,
  icon,
  children,
}: {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex space-x-2 rounded-md border border-gray-200 p-2 dark:border-gray-800">
      <div className="flex-shrink-0">{icon}</div>
      <div className="space-y-1">
        <h5>{title}</h5>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
