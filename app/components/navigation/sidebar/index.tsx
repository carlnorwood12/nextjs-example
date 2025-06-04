import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-4">
      <nav className="space-y-2">
        <div className="mb-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-600 mb-2">Content Management</h3>
          <Link href="/admin/edit" className="block px-4 py-2 rounded hover:bg-gray-900 transition-colors text-gray-300 hover:text-white">
            📝 Edit Content
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
