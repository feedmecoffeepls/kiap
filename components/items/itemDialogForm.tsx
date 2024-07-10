// 1. Import necessary modules
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectItem } from '@/db/schema';
import { Dialog, DialogContent } from '../ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';

// 2. Define the component's props
type ItemFormProps = {
    item?: SelectItem;
};

// 3. Use Zod to validate form inputs
const itemSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    selling_price: z.number(),
    // Add other fields as necessary
});

// 4. Create the component
const ItemDialogForm: React.FC<ItemFormProps> = ({ item }) => {
    const { register, handleSubmit: formSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(itemSchema),
        defaultValues: item ? { ...item } : undefined,
    });

    const onSubmit = (data: any) => {
        if (item) {
            console.log("update")
        } else {
            console.log("new item")
        }
    };

    return (
        <Dialog>
            <DialogTrigger ><Button>Add Item</Button></DialogTrigger>
            <DialogContent >
                <form onSubmit={formSubmit(onSubmit)}>
                    <input {...register('title')} placeholder="Title" />
                    {errors.title && <p>{errors.title.message}</p>}

                    <textarea {...register('description')} placeholder="Description" />
                    {errors.description && <p>{errors.description.message}</p>}

                    <input type="number" {...register('selling_price')} placeholder="Selling Price" />
                    {errors.selling_price && <p>{errors.selling_price.message}</p>}

                    <button type="submit">{item ? 'Update' : 'Submit'}</button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ItemDialogForm;