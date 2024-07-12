import { getItem } from '@/actions/itemActions'
import { queryOptions } from '@tanstack/react-query'

export const fetchItem = (itemId: number) => {
    return queryOptions({
        queryKey: ['item-' + itemId],
        refetchOnMount: "always",
        queryFn: async () => {
            const response = await getItem(itemId)
            return response
        },
    })
}