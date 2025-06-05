"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import Logo from "@/app/components/navbar/Logo";
import { usePathname } from "next/navigation";

export default function App() {
  const pathname = usePathname();

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
            onClick={async (e) => {
              e.preventDefault(); // Prevent navigation
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error("Error logging out:", error.message);
              } else {
                // Redirect to the home page or login page after logout
                window.location.href = "/";
              }
            }}
          >
            Logout
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}