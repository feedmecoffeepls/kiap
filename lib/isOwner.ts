"use server";

import { currentUser } from "@clerk/nextjs/server";

const isOwner = async (itemId: string) => {
    const user = await currentUser();

    if (!user) {
        return false;
    }
    return user.id === itemId;
}

export default isOwner