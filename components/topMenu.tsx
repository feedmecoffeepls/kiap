"use client";

import React from 'react';
import UserMenu from './user/user-menu';
import Link from 'next/link';
import { useSellerMode } from '@/stores/sellerMode';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const TopMenu: React.FC = () => {
    const sellerMode = useSellerMode((state) => state.sellerMode);
    const setSellerMode = useSellerMode((state) => state.setSellerMode);
    console.log(sellerMode);
    return (
        <div className="flex w-full py-12 justify-between">
            <div className="flex items-center justify-start">
                <Link href="/">
                    <p className="barlow text-2xl font-bold">Kiap</p>
                </Link>
            </div>
            <div className="flex items-center justify-end flex-grow">
                <div className="flex items-center space-x-2 pr-4">
                    <Label htmlFor="airplane-mode">{sellerMode ? "Seller" : "Buyer"} Mode</Label>
                    <Switch
                        checked={sellerMode}
                        onClick={() => setSellerMode(!sellerMode)}
                    />
                </div>
                <UserMenu />
            </div>
        </div>
    );
};

export default TopMenu;