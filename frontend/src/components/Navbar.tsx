import React from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getSession } from "@/actions";

export default async function Navbar() {
    const session = await getSession();

    return (
        <div className="w-full bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="relative flex items-center justify-center h-14">
                    <NavigationMenu className="absolute left-0">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <span className="font-bold">Logo</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-2">
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/restaurants"
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Restaurants
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/bookings" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        My Bookings
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu className="absolute right-0">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/register" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <span className="font-bold">register</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            {session.isLoggedIn ? (
                                <NavigationMenuItem>
                                    <Link
                                        href="/logout"
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            <span className="font-bold">
                                                logout
                                            </span>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ) : (
                                <NavigationMenuItem>
                                    <Link href="/login" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            <span className="font-bold">
                                                login
                                            </span>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </div>
    );
}
