import React from 'react';
import { SelectItem } from '@/db/schema';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';

interface ItemCardProps {
    item: SelectItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const priceInDecimal = (item.selling_price / 100).toFixed(2);

    console.log({ cardItem: item })

    return (
        <Link href={`/item/${item.id}`}>
            <div className="w-full" >
                <AspectRatio style={{ width: '100%' }} ratio={1} className="rounded-lg overflow-hidden">
                    <Image src="/testUnsplash.jpg" alt="Unsplash Test" layout="fill" objectFit="cover" />
                </AspectRatio>
                <div className="flex justify-between mt-4">
                    <h6 className="card-title barlow font-bold">{item.title}</h6>
                    <div className="text-right">
                        <h6 className="card-text">${priceInDecimal}</h6>
                        <p className="card-text">Last bid: ${priceInDecimal}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ItemCard;