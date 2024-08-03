import PageHeader from "@/components/PageHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader className="m-8" />
      <main className="m-8">{children}</main>
      <footer className="mt-auto text-center py-8">Footer</footer>
    </>
  );
}
