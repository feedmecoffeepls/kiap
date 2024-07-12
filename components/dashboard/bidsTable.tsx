import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SelectBid } from "@/db/schema";
import { formatPrice } from "@/lib/formatPrice";

interface BidsTableProps {
    bids: SelectBid[];
}

const BidsTable: React.FC<BidsTableProps> = ({ bids }) => {
    console.log(bids)
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
                {bids.map((bids, key) =>
                    <TableRow key={"bid-" + key}>
                        <TableCell className="font-medium"></TableCell>
                        <TableCell>{formatPrice(bids.bid_amount)}</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default BidsTable