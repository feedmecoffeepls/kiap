import { getItems } from '@/actions/itemActions'
import { queryOptions } from '@tanstack/react-query'

export const fetchItems = queryOptions({
  queryKey: ['items'],
  queryFn: async () => {
    const response = await getItems()

    return response
  },
})