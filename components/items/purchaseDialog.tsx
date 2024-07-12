"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { SelectItem } from '@/db/schema';
import { formatPrice } from '@/lib/formatPrice';
import { createSale } from '@/actions/saleActions';
import { toast } from '../ui/use-toast';


type PurchaseDialogProps = {
    item: SelectItem;
    refetch: () => void;
};

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({ item, refetch }) => {

    const [error, setError] = useState<string | null>(null);

    const handlePurchase = async (item: SelectItem) => {
        const sale = await createSale(item);
        if ('message' in sale) {
            setError(sale.message);
            console.log(sale.message);
        }
        await refetch();
        setOpen(false)
        toast({
            title: "Item purchased",
            description: "We have purchased your item",
        })
    }

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="cta" size="cta">Buy now: ({formatPrice(item.selling_price)})</Button></DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>Purchase {item.title}</DialogTitle></DialogHeader>
                <DialogDescription>
                    Purchase this item at the buyout price?
                </DialogDescription>
                <Button variant="cta" size="cta" onClick={() => handlePurchase(item)}>Confirm purchase: ({formatPrice(item.selling_price)})</Button>
            </DialogContent>
        </Dialog>
    );
};

export default PurchaseDialog;