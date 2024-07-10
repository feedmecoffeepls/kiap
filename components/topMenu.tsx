"use client";

import React from 'react';
import UserMenu from './user/user-menu';
import Link from 'next/link';

const TopMenu: React.FC = () => {
    return (
        <div className="flex w-full py-12">
            <div className="flex items-center justify-start">
                <Link href="/">
                    <p className="barlow text-2xl font-bold">Kiap</p>
                </Link>
            </div>
            <div className="flex items-center justify-end flex-grow">
                <UserMenu />
            </div>
        </div>
    );
};

export default TopMenu;