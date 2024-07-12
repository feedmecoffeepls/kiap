"use server";

import { eq } from 'drizzle-orm';
import { sales, SelectBid, SelectItem, SelectSale } from '../db/schema';
import db from '../db/drizzle';

import { currentUser } from '@clerk/nextjs/server';
import { SalesWithRelations } from '@/types/salesWithRelations';

export const getSalesByProfileId = async (profileId: string): Promise<SalesWithRelations[]> => {
    const result = await db.query.sales.findMany({
        where: (sales, { eq }) => (
            eq(sales.profile_id, profileId)
        ),
        with: { item: true, bid: true }
    });

    return result;
};

export const createSale = async (item: SelectItem): Promise<SelectSale | { message: string }> => {
    const user = await currentUser()

    if (!user) {
        return { message: "User not logged in" };
    }

    if (user.id === item.profile_id) {
        return { message: "You can't buy your own item" };
    }

    const result = await db
        .insert(sales)
        .values({ profile_id: user.id, item_id: item.id })
        .returning();

    return result.length > 0 ? result[0] : { message: "Something went wrong" };
};

export const createSaleWithBid = async (item: SelectItem, bid: SelectBid): Promise<SelectSale | { message: string }> => {

    const result = await db
        .insert(sales)
        .values({ profile_id: bid.profile_id, item_id: item.id, bid_id: bid.id })
        .returning();

    return result.length > 0 ? result[0] : { message: "Something went wrong" };
};