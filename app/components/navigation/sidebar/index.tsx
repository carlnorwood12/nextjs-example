import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-emerald-400">Admin Panel</h2>
        <p className="text-sm text-gray-300 mt-1">Management Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        <div className="mb-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Content Management
          </h3>
          <Link 
            href="/admin/edit"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
          >
            📝 Edit Content
          </Link>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            User Management
          </h3>
          <Link 
            href="/admin/login"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
          >
            🔐 Login
          </Link>
          
          <Link 
            href="/admin/registration"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
          >
            👤 Registration
          </Link>
        </div>
        
        <div className="pt-4 mt-6 border-t border-gray-600">
          <Link 
            href="/"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            ← Back to Main Site
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;