import { getBidsByProfileId } from '@/actions/bidActions'
import { currentUser } from '@clerk/nextjs/server'
import { queryOptions } from '@tanstack/react-query'


export const fetchUserBids = async () => {
    const user = await currentUser()
    return queryOptions({
        queryKey: ['bids'],
        queryFn: async () => {
            const response = await getBidsByProfileId(user?.id as string)
            return response
        },
    })
}