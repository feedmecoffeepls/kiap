import { getItemsByProfileId } from "@/actions/itemActions";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/lib/formatPrice";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";


const ItemsTable: React.FC = () => {
    const { user } = useUser()
    const { isPending, error, data } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const response = await getItemsByProfileId(user?.id as string)
            return response
        },
        enabled: !!user,
    })

    const items = data
    if (isPending) { return <div>Loading</div> }
    if (!items || items.length === 0) { return <div>No items found</div> }
    console.log(items)
    return (
        <>
            <h1 className="pb-4">Your Items</h1>
            <Table>
                <TableCaption>All your items</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Highest bid</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item, key) =>
                        <TableRow key={"item-" + key}>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell className="font-medium">{item.description}</TableCell>
                            <TableCell>{formatPrice(item.selling_price)}</TableCell>
                            <TableCell>{item.bids[0] ? formatPrice(item.bids[0].bid_amount) : "No bids"}</TableCell>
                            <TableCell className="text-right">{item?.sales.length > 0 ? "Sold" : "Pending"}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default ItemsTable