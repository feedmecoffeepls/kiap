"use client";

import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '../ui/dropdown-menu';
import { useUser } from "@clerk/clerk-react";
import { useClerk } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';


const UserMenu = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { signOut } = useClerk();

    if (!isLoaded) return (<Skeleton className="w-10 h-10 rounded-[50%]" />)

    if (isSignedIn) return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src="/avatar.jpg" alt="User avatar" />
                    <AvatarFallback delayMs={600}>U</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">Your Activity</DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer" onSelect={() => signOut({ redirectUrl: '/' })}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
    return (
        <div>
            <Link href="/auth/login">
                <Button className="font-bold py-2 px-4 rounded">
                    Sign in
                </Button>
            </Link>
        </div>
    )
};

export default UserMenu;