"use server";

import { and, asc, eq, gt, isNull, notExists, sql } from 'drizzle-orm';
import { bids, items, sales, SelectItemWithRelations } from '../db/schema';
import db from '../db/drizzle';
import { SelectItem } from '../db/schema';

export const getItems = async (cursor?: number, pageSize = 10): Promise<SelectItem[]> => {

    const result = await db.select()
        .from(items)
        .leftJoin(sales, eq(items.id, sales.item_id))
        .where(and(isNull(sales.id), cursor ? gt(items.id, cursor) : undefined))
        .limit(pageSize)
        .orderBy(asc(items.id))
        .execute();

    console.log(result);

    return result.map((item) => item.items);
};

export const getItem = async (itemId: number): Promise<SelectItemWithRelations | null> => {
    let result = await db.query.items.findFirst(
        {
            where: (items, { eq }) => (
                eq(items.id, itemId)),
            with: { sales: true, profile: true, images: true, bids: true }
        }
    );

    if (result) {
        const sortedBids = result.bids.sort((a, b) => b.bid_amount - a.bid_amount);
        result.bids = sortedBids;
        return result;
    } else {
        return null
    }
};

interface CreateItemSchema {
    profile_id: string;
    title: string;
    selling_price: number;
    description?: string;
}

export const createItem = async ({ item }: { item: CreateItemSchema }): Promise<SelectItem | null> => {
    const result = await db
        .insert(items)
        .values({ ...item })
        .returning();

    return result.length > 0 ? result[0] : null;
};