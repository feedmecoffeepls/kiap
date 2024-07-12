"use client"

import React from 'react';
import Gallery from '@/components/ui/gallery';
import { formatPrice } from '@/lib/formatPrice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BidDialog from '@/components/items/bidDialog';
import PurchaseDialog from '@/components/items/purchaseDialog';
import ImageCarousel from '@/components/items/imageCarousel';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchItem } from '@/lib/tanstack/fetchItem';
import ImageDialog from '@/components/items/imageDialog';
import ItemDialogForm from '@/components/items/itemDialogForm';
import { useUser } from '@clerk/nextjs';
import { useSellerMode } from '@/stores/sellerMode';
import { is } from 'drizzle-orm';

interface ItemPageProps {
    itemId: number;
}

const ItemPage: React.FC<ItemPageProps> = ({ itemId }) => {

    const { data: item, isLoading, error } = useSuspenseQuery(fetchItem(itemId))
    if (isLoading) return <div>Loading...</div>
    if (item === null) return <div>Item not found</div>

    const itemImages = item.images.map((image) => image.blob_url)

    const { user } = useUser();
    const isOwner = user?.id === item.profile_id;

    console.log(user?.id)
    console.log(item)

    const sellerMode = useSellerMode((state) => state.sellerMode)


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 hidden lg:block">
                <Gallery images={itemImages} />
            </div>
            <div className="lg:hidden">
                <ImageCarousel images={itemImages} />
            </div>
            <div className="relative">
                <div className="sticky top-0 h-[100svh] p-8 ">
                    <div className="full-w">
                        {sellerMode && isOwner && (
                            <div className="mb-8">
                                <ImageDialog item={item} />
                                <span className="ml-4">
                                    <ItemDialogForm item={item} />
                                </span>
                            </div>
                        )}
                        <div className="flex items-center mb-8">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                <AvatarFallback delayMs={600}>U</AvatarFallback>
                            </Avatar>
                            <p className="ml-4 font-bold"> {item.profile?.username} </p>
                        </div>
                        <div>
                            <h1 className="mb-2">{item.title}</h1>
                            <div className="flex items-end">
                                <p className="text-xl">{formatPrice(item.selling_price)}</p>
                                {item.bids && item.bids.length > 0 && (
                                    <p className="ml-4">Last Bid: {formatPrice(item.bids[0].bid_amount)}</p>
                                )}
                            </div>
                        </div>
                        <div className="my-8">
                            <h6>Details</h6>
                            <p className="my-2">{item.description}</p>
                        </div>
                        {!item.sales || item.sales?.length === 0 && (
                            <>
                                <div className="full-w my-4">
                                    <PurchaseDialog item={item} />
                                </div>
                                <div className="full-w  my-4">
                                    <BidDialog item={item} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;