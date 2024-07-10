"use client"

import React from 'react';
import { SelectItem } from '@/db/schema';
import Gallery from '@/components/ui/gallery';

interface ItemPageProps {
    item: SelectItem;
}
const demoImageArray = ["/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg"];

const ItemPage: React.FC<ItemPageProps> = ({ item }) => {
    return (
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
                <Gallery images={demoImageArray} />
            </div>
            <div className="relative">
                <div className="sticky top-0 h-[100svh] flex items-center">
                    <div>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <p>Price: ${item.selling_price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;