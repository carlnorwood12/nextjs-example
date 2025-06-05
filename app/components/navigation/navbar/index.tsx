"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import Logo from "@/app/components/navbar/Logo";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function App() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Function to handle logout
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push('/'); // Redirect to home page after logout
      router.refresh();
    }
  };

  return (
    <Navbar className="bg-black shadow-md" aria-label="Main Navigation">
      <NavbarBrand>
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" className={`${pathname === "/" ? "text-white" : "text-gray-500"} hover:text-white`}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" className={`${pathname === "/about" ? "text-white" : "text-gray-500"} hover:text-white`}>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/services" className={`${pathname === "/services" ? "text-white" : "text-gray-500"} hover:text-white`}>
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact" className={`${pathname === "/contact" ? "text-white" : "text-gray-500"} hover:text-white`}>
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/admin/login" className="text-gray-500 hover:text-white">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/admin/registration" className="text-indigo-600 hover:text-indigo-700">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
      
          <Link
            href="/"
            className="text-red-600 hover:text-red-700"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}