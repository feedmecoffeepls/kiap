import { getSalesByProfileId } from "@/actions/saleActions";
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


const PurchaseTable: React.FC = () => {
    const { user } = useUser()
    const { isPending, error, data } = useQuery({
        queryKey: ['purchases'],
        queryFn: async () => {
            const response = await getSalesByProfileId(user?.id as string)
            return response
        },
        enabled: !!user,
    })

    const purchases = data
    if (isPending) { return <div>Loading</div> }
    if (!purchases) { return <div>No purchases found</div> }
    return (
        <>
            <h1 className="pb-4">Your Purchases</h1>
            <Table>
                <TableCaption>A list of your recent purchases</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Item</TableHead>
                        <TableHead className="text-right">Purchase Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {purchases.map((purchase, key) =>
                        <TableRow key={"purchase-" + key}>
                            <TableCell className="font-medium">{purchase.item.title}</TableCell>
                            <TableCell className="text-right">{purchase.bid ? formatPrice(purchase.bid.bid_amount) : formatPrice(purchase.item.selling_price)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default PurchaseTable