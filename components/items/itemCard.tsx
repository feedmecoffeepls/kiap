import React from 'react';
import { SelectItem } from '@/db/schema';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import { EnhancedSelectItemWithRelations } from '@/types/marketplaceSales';

interface ItemCardProps {
    item: EnhancedSelectItemWithRelations;
}

const ItemCard: React.FC<ItemCardProps> = ({ item: dbItem }) => {
    const item = dbItem.items;
    const images = dbItem.itemImages;
    const priceInDecimal = (item.selling_price / 100).toFixed(2);

    console.log({ cardItem: item })

    console.log({ dbItem })

    return (
        <Link href={`/item/${item.id}`}>
            <div className="w-full" >
                <AspectRatio style={{ width: '100%' }} ratio={1} className="rounded-lg overflow-hidden">
                    <Image src={images ? images.blob_url : "/noImage.jpg"} alt="Unsplash Test" layout="fill" objectFit="cover" />
                    {!images && <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"><p className="text-2xl">No Image</p></div>}
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