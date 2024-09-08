import SideNav from "@/components/SideNav";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <aside>
        <SideNav />
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
  );
}