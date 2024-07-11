"use client"

import React, { useState } from 'react';
import { SelectItem, SelectSale } from '@/db/schema';
import Gallery from '@/components/ui/gallery';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import { createSale } from '@/actions/saleActions';

interface ItemPageProps {
    item: SelectItem & {
        sales?: SelectSale[];
    };
}

const demoImageArray = ["/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg", "/testUnsplash.jpg"];

const ItemPage: React.FC<ItemPageProps> = ({ item }) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePurchase = async (item: SelectItem) => {
        const sale = await createSale(item);
        if ('message' in sale) {
            setError(sale.message);
            console.log(sale.message);
        }
    }

    return (
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
                <Gallery images={demoImageArray} />
            </div>
            <div className="relative">
                <div className="sticky top-0 h-[100svh] flex items-center">
                    <div>
                        <div>
                            <h1>{item.title}</h1>
                            <p>{formatPrice(item.selling_price)}</p>
                        </div>
                        <div className="my-8">
                            <h6>Details</h6>
                            <p>{item.description}</p>
                        </div>
                        {item.sales?.length === 0 && (
                            <div>
                                <Button className="full-w" onClick={() => handlePurchase(item)}>Buy now ({formatPrice(item.selling_price)})</Button>
                                <Button className="full-w">Bid ({formatPrice(item.selling_price)})</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;