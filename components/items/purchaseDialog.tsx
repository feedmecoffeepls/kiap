"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { SelectItem } from '@/db/schema';
import { formatPrice } from '@/lib/formatPrice';
import { createSale } from '@/actions/saleActions';


type PurchaseDialogProps = {
    item: SelectItem;
};

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({ item }) => {

    const [error, setError] = useState<string | null>(null);

    const handlePurchase = async (item: SelectItem) => {
        const sale = await createSale(item);
        if ('message' in sale) {
            setError(sale.message);
            console.log(sale.message);
        }
    }

    return (
        <Dialog>
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