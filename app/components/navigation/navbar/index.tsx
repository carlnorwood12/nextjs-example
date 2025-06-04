"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import Logo from "@/app/components/navbar/Logo";


export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
      <Link href="/">
        <Logo />
      </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/about">
          About
        </Link>
      </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="/services">
          Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
          Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}