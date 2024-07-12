"use client";

import ItemDialogForm from '@/components/items/itemDialogForm';
import ItemsList from '@/components/items/itemsList';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchItems } from '@/lib/tanstack/fetchItems';
import { useSellerMode } from '@/stores/sellerMode';
import { useUser } from '@clerk/nextjs';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

const HomePage: React.FC = () => {
    const { user } = useUser()
    const sellerMode = useSellerMode((state) => state.sellerMode);
    const { data, isLoading, error, refetch } = useSuspenseQuery(fetchItems)

    if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 md:gap-8 2xl:gap-16 gap-y-12">
        <AspectRatio style={{ width: '100%' }} ratio={1} className="rounded-lg overflow-hidden"><Skeleton className="w-full h-full" />
        </AspectRatio>
    </div>;
    if (error) return <div>Error: {error.message}</div>;

    if (data.length === 0 && !isLoading) return <div>No items found</div>;
    return (
        <div>
            {user && sellerMode &&
                <div className="float-right mb-8">
                    <ItemDialogForm refetch={refetch} />
                </div>
            }
            <ItemsList data={data} />
        </div>
    );
};

export default HomePage;