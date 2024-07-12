"use client";

import { getBidsByProfileId } from "@/actions/bidActions";
import BidsTable from "@/components/dashboard/bidsTable";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {

    const { user } = useUser()
    const { isPending, error, data } = useQuery({
        queryKey: ['bids'],
        queryFn: async () => {
            const response = await getBidsByProfileId(user?.id as string)
            return response
        },
        enabled: !!user,
    })
    console.log({ data: data });
    return (
        <div>
            <h1>Your Bids</h1>
            {isPending && <div>Loading...</div>}
            {data && <BidsTable bids={data} />}
        </div>
    )
}

export default DashboardPage;