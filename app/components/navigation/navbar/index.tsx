'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import Logo from "./Logo";

export default function NavbarComponent() {
  return (
    <Navbar className="bg-emerald-800" maxWidth="full">
      <NavbarBrand>
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/about" className="text-white hover:text-gray-200">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/services" className="text-white hover:text-gray-200">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contacts" className="text-white hover:text-gray-200">
            Contacts
          </Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/admin/login" className="text-white hover:text-gray-200">
            Admin Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button 
            as={Link} 
            color="primary" 
            href="/admin/registration" 
            variant="flat"
            className="bg-white text-emerald-800 hover:bg-gray-100"
          >
            Admin Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}