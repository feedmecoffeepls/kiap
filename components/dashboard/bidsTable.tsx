import { getBidsByProfileId } from "@/actions/bidActions";
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


const BidsTable: React.FC = () => {
    const { user } = useUser()
    const { isPending, error, data } = useQuery({
        queryKey: ['bids'],
        queryFn: async () => {
            const response = await getBidsByProfileId(user?.id as string)
            return response
        },
        enabled: !!user,
    })

    const bids = data
    if (isPending) { return <div>Loading</div> }
    if (!bids) { return <div>No bids found</div> }
    return (
        <>
            <h1 className="pb-4">Your Bids</h1>
            <Table>
                <TableCaption>A list of your recent bids</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Item</TableHead>
                        <TableHead>Bid Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bids.map((bid, key) =>
                        <TableRow key={"bid-" + key}>
                            <TableCell className="font-medium">{bid.item.title}</TableCell>
                            <TableCell>{formatPrice(bid.bid_amount)}</TableCell>
                            <TableCell className="text-right">{bid.item.sales && bid.item.sales.length > 0 ? "Successful" : "Pending"}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default BidsTable