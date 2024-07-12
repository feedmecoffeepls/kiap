"use client"

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { createBid } from '@/actions/bidActions';
import { SelectBid, SelectItem } from '@/db/schema';
import { formatPrice } from '@/lib/formatPrice';
import { RSC_PREFETCH_SUFFIX } from 'next/dist/lib/constants';
import { toast } from '../ui/use-toast';

interface BidWithItem extends SelectItem {
    bids: SelectBid[]
}

type BidDialogProps = {
    item: BidWithItem
    refetch: () => void;
}

const bidSchema = z.object({
    bid_amount: z.string(),
});

type BidFormValues = z.infer<typeof bidSchema> & SelectItem;

const BidDialog: React.FC<BidDialogProps> = ({ item, refetch }) => {
    const form = useForm<BidFormValues>({
        resolver: zodResolver(bidSchema),
    });

    const currentBid = form.watch('bid_amount')

    const minimumBidValue = item.bids[0]?.bid_amount ? item.bids[0]?.bid_amount + 100 : 100
    const minimumBid = item.bids[0]?.bid_amount ? formatPrice(minimumBidValue) : "$1.00"

    const onSubmit = async (data: any) => {
        try {
            const insertedBid = await createBid({ item: item, bidAmount: parseFloat(data.bid_amount) * 100 });
            console.log(insertedBid);
            await refetch();
            form.reset();
            setOpen(false)
            toast({
                title: "Bid placed",
                description: "We have placed your bid",
            })
        } catch (error) {
            form.setError('title', { message: 'Failed to create bid' });
        }
    };

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="outline" size="cta">Min bid: ({minimumBid})</Button></DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>Bid for {item.title}</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="bid_amount"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Bid amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder={minimumBid} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Current minimum bid: {minimumBid}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant="cta" size="cta" type="submit" disabled={currentBid && parseFloat(currentBid) * 100 >= minimumBidValue ? false : true}>{currentBid ? `Bid: ${formatPrice(parseFloat(currentBid) * 100)}` : "Enter minimum bid amount"}</Button>
                        {currentBid && parseFloat(currentBid) * 100 >= item.selling_price && <p className="text-center">Are you sure you want to bid more than the selling price?</p>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BidDialog;