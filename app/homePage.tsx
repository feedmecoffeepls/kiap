"use client";

import ItemDialogForm from '@/components/items/itemDialogForm';
import ItemsList from '@/components/items/itemsList';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div>
            <div className="float-right mb-8">
                <ItemDialogForm />
            </div>
            <ItemsList />
        </div>
    );
};

export default HomePage;