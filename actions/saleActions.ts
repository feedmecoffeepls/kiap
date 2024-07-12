"use server";

import { eq } from 'drizzle-orm';
import { sales, SelectBid, SelectItem, SelectSale } from '../db/schema';
import db from '../db/drizzle';

import { currentUser } from '@clerk/nextjs/server';

export const getSalesByProfileId = async (profileId: string): Promise<SelectSale[]> => {
    const result = await db
        .select()
        .from(sales)
        .where(eq(sales.profile_id, profileId))
        .execute();

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