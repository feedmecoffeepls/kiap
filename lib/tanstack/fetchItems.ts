import { getItems } from '@/actions/itemActions'
import { queryOptions } from '@tanstack/react-query'

export const fetchItems = queryOptions({
  queryKey: ['landing-items'],
  refetchOnMount: "always",
  queryFn: async () => {
    const response = await getItems()

    return response
  },
})