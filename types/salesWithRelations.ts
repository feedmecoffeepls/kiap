import { SelectBid, SelectItem, SelectSale } from "@/db/schema";

export interface SalesWithRelations extends SelectSale {
    bid: SelectBid | null
    item: SelectItem
}