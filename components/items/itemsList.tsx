"use client";

import React, { useEffect, useState } from 'react';
import ItemCard from './itemCard';
import { SelectItem } from '@/db/schema';

const ItemsList: React.FC<{ data: SelectItem[] }> = ({ data }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 md:gap-8 2xl:gap-16 gap-y-12">
            {data.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemsList;