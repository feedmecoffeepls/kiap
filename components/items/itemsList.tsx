"use client";

import React, { useEffect, useState } from 'react';
import { getItems } from '@/actions/itemActions';
import { SelectItem } from '@/db/schema';
import ItemCard from './itemCard';

const ItemsList: React.FC = () => {
    const [items, setItems] = useState<SelectItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getItems();
                console.log(fetchItems)
                setItems(fetchedItems || []);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (items.length === 0 && !loading) return <div>No items found</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 md:gap-8 2xl:gap-16 gap-y-12">
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemsList;