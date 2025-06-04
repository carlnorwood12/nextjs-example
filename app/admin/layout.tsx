import Sidebar from "../components/navigation/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}