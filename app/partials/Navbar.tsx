"use client";

import {
    Avatar,
    Dropdown,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
} from "flowbite-react";
import Link from "next/link"; // Correct import
import { usePathname } from "next/navigation";
import { useState } from "react";
import useStore from "../lib/store";

export function Nav() {
    const pathname = usePathname(); // This gives you the current URL path

    const { users, currentUser, setCurrentUser } = useStore();

    const handleChangeUser = (user: any) => {
        setCurrentUser(user);
    }
    return (
        <Navbar fluid rounded className="!bg-gray-800 border-b rounded-none">
            <NavbarBrand href="/">
                <img src="/globe.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-300">Tracker.</span>
            </NavbarBrand>
            <div className="flex md:order-2 items-center gap-2">
                <div className="capitalize w-20 flex justify-end text-gray-300">{currentUser.name}</div>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={`/${currentUser.name}.svg`} rounded />
                    }
                >
                    {users.map((user) => (
                        <DropdownItem key={user.id} onClick={() => handleChangeUser(user)}>{user.name}</DropdownItem>
                    ))}
                </Dropdown>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                {[
                    { href: '/', label: 'Home' },
                    { href: '/tasks', label: 'Tasks' },
                    { href: '/track', label: 'Track' },
                    { href: '/reports', label: 'Reports' },
                ].map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`p-2 rounded-xl ${pathname === item.href ? 'bg-gray-300 text-gray-700' : 'text-gray-300'}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </NavbarCollapse>
        </Navbar>
    );
}
