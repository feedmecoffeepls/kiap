import { SelectBid, SelectItem, SelectSale } from "@/db/schema";

interface ItemsWithSale extends SelectItem {
    sales?: SelectSale[]
}

export interface BidsWithItems extends SelectBid {
    item: ItemsWithSale
}

export type BidsWithRelationships = {
    bids: BidsWithItems[];
}