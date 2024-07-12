"use server";

import { eq } from 'drizzle-orm';
import { bids, SelectBid, SelectItem, InsertBid } from '../db/schema';
import db from '../db/drizzle';

import { currentUser } from '@clerk/nextjs/server';
import { BidsWithItems } from '@/types/bidsWithRelations';

export const getBidsByProfileId = async (profileId: string): Promise<BidsWithItems[]> => {
    const result = await db.query.bids.findMany(
        {
            where: (bids, { eq }) => (
                eq(bids.profile_id, profileId)
            ),
            with: { item: { with: { sales: true } } }
        }
    )
    console.log(result);

    if (!result) {
        throw new Error("No bids found");
    }

    return result;
};

export const createBid = async ({ item, bidAmount }: { item: SelectItem, bidAmount: number }): Promise<InsertBid | { message: string }> => {
    const user = await currentUser()

    if (!user) {
        return { message: "User not logged in" };
    }

    if (user.id === item.profile_id) {
        return { message: "You can't bid for your own item" };
    }

    const result = await db
        .insert(bids)
        .values({ profile_id: user.id, item_id: item.id, bid_amount: bidAmount })
        .returning();

    return result.length > 0 ? result[0] : { message: "Something went wrong" };
};