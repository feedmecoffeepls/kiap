import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SelectBid, SelectItem, SelectSale } from "@/db/schema";
import { formatPrice } from "@/lib/formatPrice";
import { BidsWithRelationships } from "@/types/bidsWithRelations";


const BidsTable: React.FC<BidsWithRelationships> = ({ bids }) => {
    return (
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
                        <TableCell className="text-right">{bid.item?.sales ? "Successful" : "Pending"}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default BidsTable