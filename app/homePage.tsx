"use client";

import ItemDialogForm from '@/components/items/itemDialogForm';
import ItemsList from '@/components/items/itemsList';
import { useUser } from '@clerk/nextjs';
import React from 'react';

const HomePage: React.FC = () => {
    const { user } = useUser()
    return (
        <div>
            {user &&
                <div className="float-right mb-8">
                    <ItemDialogForm />
                </div>
            }
            <ItemsList />
        </div>
    );
};

export default HomePage;