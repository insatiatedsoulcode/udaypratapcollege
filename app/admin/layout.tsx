// app/admin/layout.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Correct relative path
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaTachometerAlt, FaFileAlt, FaInbox, FaSignOutAlt } from "react-icons/fa";

// Define a type for the user session that includes the 'role' property
interface UserSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // Cast the user to our specific type instead of 'any'
  const userRole = (session?.user as UserSession)?.role;

  if (!session || userRole !== 'admin') {
    const loginUrl = new URL("/api/auth/signin", process.env.NEXTAUTH_URL || "http://localhost:3000");
    loginUrl.searchParams.set("callbackUrl", "/admin");
    redirect(loginUrl.toString());
  }

  return (
    // The <html> and <body> tags are already in your root app/layout.tsx.
    // This layout component only provides the structure for the admin section.
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-800 text-slate-300 p-4 flex flex-col shadow-lg">
        <div>
            <h1 className="text-xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-xs text-slate-400 mb-8">Welcome, {session.user?.name}</p>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li><Link href="/admin" className="flex items-center p-2 rounded-md hover:bg-slate-700 transition-colors"><FaTachometerAlt className="mr-3" /> Dashboard</Link></li>
            <li><Link href="/admin/applications" className="flex items-center p-2 rounded-md hover:bg-slate-700 transition-colors"><FaFileAlt className="mr-3" /> Applications</Link></li>
            <li><Link href="/admin/inquiries" className="flex items-center p-2 rounded-md hover:bg-slate-700 transition-colors"><FaInbox className="mr-3" /> Inquiries</Link></li>
          </ul>
        </nav>
        <div>
          <Link href="/api/auth/signout" className="flex items-center p-2 rounded-md text-slate-400 hover:bg-red-500 hover:text-white transition-colors">
            <FaSignOutAlt className="mr-3" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        <main className="p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
