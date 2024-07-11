"use client";

import React, { useEffect, useState } from 'react';
import { getItems } from '@/actions/itemActions';
import { SelectItem } from '@/db/schema';
import ItemCard from './itemCard';
import { Skeleton } from '../ui/skeleton';
import { AspectRatio } from '../ui/aspect-ratio';
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchItems } from '@/lib/tanstack/fetchItems';

const ItemsList: React.FC = () => {

    const { data, isLoading, error } = useSuspenseQuery(fetchItems)

    if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 md:gap-8 2xl:gap-16 gap-y-12">
        <AspectRatio style={{ width: '100%' }} ratio={1} className="rounded-lg overflow-hidden"><Skeleton className="w-full h-full" />
        </AspectRatio>
    </div>;
    if (error) return <div>Error: {error.message}</div>;

    if (data.length === 0 && !isLoading) return <div>No items found</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 md:gap-8 2xl:gap-16 gap-y-12">
            {data.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemsList;