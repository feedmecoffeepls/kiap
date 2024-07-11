"use server";

import { eq } from 'drizzle-orm';
import { profiles, InsertProfile } from '../db/schema';
import db from '../db/drizzle';

export const createProfile = async (userId: string): Promise<InsertProfile | { message: string }> => {

    const result = await db
        .insert(profiles)
        .values({ user_id: userId, username: userId })
        .returning();

    return result.length > 0 ? result[0] : { message: "Something went wrong" };
};