"use client";
import { Menus } from '@/constants';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { useState } from 'react';


const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth={'full'}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <a href='/'><p className="font-bold text-inherit">EMPORIUM OF VERRA</p></a>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
        {Menus.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color={`${item.src == pathname ? 'primary' : 'foreground'}`} href={item.src}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu  className='mx-2'>
        {Menus.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            color={"danger"}
            className="w-full"
            href="#"
            size="lg"
          >
            {"Log Out"}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarComponent
