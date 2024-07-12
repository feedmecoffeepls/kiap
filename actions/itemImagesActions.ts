"use server";

import { eq } from 'drizzle-orm';
import { itemImages, InsertItemImages } from '../db/schema';
import db from '../db/drizzle';

export const createImages = async (itemId: number, blobUrl: string, utKey: string): Promise<InsertItemImages[] | { message: string }> => {

    const result = await db
        .insert(itemImages)
        .values({ item_id: itemId, blob_url: blobUrl, ut_key: utKey })
        .returning();

    return result ? result : { message: "Something went wrong" };
};