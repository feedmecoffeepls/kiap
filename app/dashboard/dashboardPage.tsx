"use client";

import { fetchUserBids } from "@/lib/tanstack/fetchUserBids";
import { useUser } from "@clerk/nextjs";
import { useSuspenseQuery } from "@tanstack/react-query";

const DashboardPage = () => {
    const { user } = useUser()
    const { data, isLoading, error } = useSuspenseQuery(fetchUserBids)
    return (
        <div>
            <h1>Your Bids</h1>
        </div>
    )
}

export default DashboardPage;