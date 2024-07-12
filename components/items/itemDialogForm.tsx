// 1. Import necessary modules
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectItemWithRelations } from '@/db/schema';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { createItem, updateItem } from '@/actions/itemActions';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';



type ItemFormProps = {
    item?: SelectItemWithRelations;
    refetch: () => void;
};
const itemSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    selling_price: z.string(),
});

const ItemDialogForm: React.FC<ItemFormProps> = ({ item, refetch }) => {
    const [banner, setBanner] = React.useState<File | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setBanner(files[0] || null); z
            console.log(files[0]);
        }
    };


    const form = useForm<z.infer<typeof itemSchema>>({
        resolver: zodResolver(itemSchema),
        defaultValues: item ? { title: item.title, selling_price: item.selling_price.toString(), description: item.description ? item.description : "" } : {},
    });

    const onSubmit = async (data: any) => {

        if (item) {
            try {
                const updatedItem = await updateItem({ item: { ...data, selling_price: parseFloat(data.selling_price), id: item.id } });
                await refetch();
                toast({
                    title: "Item updated",
                    description: "We have updated your item",
                })
                setOpen(false)
            } catch (error) {
                form.setError('title', { message: 'Failed to create item' });
            }
        } else {
            try {
                const createdItem = await createItem({ item: { ...data, selling_price: parseFloat(data.selling_price) } });
                await refetch();
                toast({
                    title: "Item listed",
                    description: "We have listed your item",
                })
                setOpen(false)
            } catch (error) {
                form.setError('title', { message: 'Failed to create item' });
            }
        }
    };

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{item ? <Button variant="noDesign">Update Item</Button> : <Button>+ List new item</Button>}</DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>{item ? "Update Item" : "List Item"}</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                        <Input placeholder="1920" {...field} />
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