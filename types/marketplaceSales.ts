import { SelectBid, SelectItem, SelectItemImages, SelectSale } from "@/db/schema";

export interface EnhancedSelectItemWithRelations {
    items: SelectItem;
    sales: SelectSale | null;
    bids: SelectBid | null;
    itemImages: SelectItemImages | null;
}

export type EnhancedSelectItemWithRelationsList = EnhancedSelectItemWithRelations[];