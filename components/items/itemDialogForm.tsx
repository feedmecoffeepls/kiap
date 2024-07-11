// 1. Import necessary modules
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectItem, SelectItemWithItemImages } from '@/db/schema';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { createItem } from '@/actions/itemActions';
import { Textarea } from '../ui/textarea';
import sharp from 'sharp';


type ItemFormProps = {
    item?: SelectItemWithItemImages;
};
const itemSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    selling_price: z.string(),
    itemImages: z.instanceof(File),
});

const ItemDialogForm: React.FC<ItemFormProps> = ({ item }) => {
    const form = useForm<z.infer<typeof itemSchema>>({
        resolver: zodResolver(itemSchema),
    });

    const banner = form.watch("itemImages")

    const onSubmit = async (data: any) => {
        console.log({ data: data })
        if (item) {
            console.log("update")
        } else {
            try {
                const item = await createItem({ item: { ...data, selling_price: parseFloat(data.selling_price) } });
            } catch (error) {
                form.setError('title', { message: 'Failed to create item' });
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{item ? <Button>Update Item</Button> : <Button>List Item</Button>}</DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>{item ? "Update Item" : "List Item"}</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="itemImages"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Banner</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} />
                                    </FormControl>
                                    {banner && <img src={URL.createObjectURL(banner)} />}
                                    <FormDescription>
                                        Your banner image
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your item title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will appear as the title on the marketplace
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about your item"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="selling_price"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Buyout price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="19.20" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the price at which the item will be sold
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ItemDialogForm;