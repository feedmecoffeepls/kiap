"use server";

import { eq } from 'drizzle-orm';
import { itemImages, InsertItemImages } from '../db/schema';
import db from '../db/drizzle';

export const createImages = async (itemId: number): Promise<InsertItemImages[] | { message: string }> => {

    const result = await db
        .insert(itemImages)
        .values({ item_id: itemId, blob_url: "https://google.com/" })
        .returning();

    return result ? result : { message: "Something went wrong" };
};