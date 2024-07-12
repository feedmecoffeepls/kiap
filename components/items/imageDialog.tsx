"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { SelectItem } from '@/db/schema';
import { UploadDropzone } from "@/lib/uploadthing";
import { createImages } from '@/actions/itemImagesActions';
import { toast } from '../ui/use-toast';


type PurchaseDialogProps = {
    item: SelectItem;
    refetch: () => void;
};

const ImageDialog: React.FC<PurchaseDialogProps> = ({ item, refetch }) => {

    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Manage Images</Button></DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>Item Images</DialogTitle></DialogHeader>
                <UploadDropzone
                    config={{ mode: "auto" }}
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                        res.forEach(async (file) => {
                            await createImages(item.id, file.url, file.key)
                        })
                        await refetch();
                        setOpen(false)
                        toast({
                            title: "Images uploaded",
                            description: "We have uploaded your images",
                        })
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ImageDialog;