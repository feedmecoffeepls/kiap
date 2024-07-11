"use server";

import { asc, eq, gt, sql } from 'drizzle-orm';
import { items } from '../db/schema';
import db from '../db/drizzle';
import { SelectItem } from '../db/schema';

export const getItems = async (cursor?: number, pageSize = 10): Promise<SelectItem[]> => {
    const result = await db
        .select()
        .from(items)
        .where(cursor ? gt(items.id, cursor) : undefined)
        .limit(pageSize)
        .orderBy(asc(items.id))
        .execute();

    return result;
};

export const getItem = async (itemId: number): Promise<SelectItem | null> => {
    const result = await db
        .select()
        .from(items)
        .where(eq(items.id, itemId))
        .limit(1)

    return result.length > 0 ? result[0] : null;
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