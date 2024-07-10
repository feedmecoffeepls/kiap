import { getItem } from '@/actions/itemActions';
import ItemPage from './itemPage';

const Item = async ({ params: { itemId } }: { params: { itemId: number } }) => {
    const item = await getItem(itemId);
    return item ? <ItemPage item={item} /> : <div>Loading...</div>;
}

export default Item