import ItemPage from './itemPage';

import { getQueryClient } from '@/lib/tanstack/queryClient';
import { fetchItem } from '@/lib/tanstack/fetchItem';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Item = async ({ params: { itemId } }: { params: { itemId: number } }) => {

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(fetchItem(itemId))

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ItemPage itemId={itemId} />
            </HydrationBoundary>
        </main>
    )
}

export default Item