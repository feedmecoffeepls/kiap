"use client"

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { createBid } from '@/actions/bidActions';
import { SelectItem } from '@/db/schema';
import { formatPrice } from '@/lib/formatPrice';


type BidDialogProps = {
    item: SelectItem;
};
const bidSchema = z.object({
    bid_amount: z.string(),
});

type BidFormValues = z.infer<typeof bidSchema> & SelectItem;

const BidDialog: React.FC<BidDialogProps> = ({ item }) => {
    const form = useForm<BidFormValues>({
        resolver: zodResolver(bidSchema),
    });

    const currentBid = form.watch('bid_amount')

    const onSubmit = async (data: any) => {
        try {
            const insertedBid = await createBid({ item: item, bidAmount: parseInt(data.bid_amount) });
        } catch (error) {
            form.setError('title', { message: 'Failed to create bid' });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild><Button variant="outline" size="cta">Bid ({formatPrice(item.selling_price)})</Button></DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>Bid for {item.title}</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="bid_amount"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Bid amoount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="19.20" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Current minimum bid:
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant="cta" size="cta" type="submit" disabled={currentBid ? false : true}>{currentBid ? `Bid: ${formatPrice(parseInt(currentBid))}` : "Enter minimum bid amount"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BidDialog;