"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { SelectItem, SelectItemImages } from '@/db/schema';
import { UploadDropzone } from "@/lib/uploadthing";
import { createImages, setBanner } from '@/actions/itemImagesActions';
import { toast } from '../ui/use-toast';

interface PurchaseDialogSchema extends SelectItem {
    refetch: () => void;
    images: SelectItemImages[];
}

type PurchaseDialogProps = {
    item: PurchaseDialogSchema;
    refetch: () => void;
};

const ImageDialog: React.FC<PurchaseDialogProps> = ({ item, refetch }) => {

    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false)

    const noBanner = item.images.every(image => !image.is_banner);

    const handleSetBanner = async (imageId: number) => {
        const success = await setBanner(item.id, imageId)
        if (success) {
            toast({
                title: "Banner set",
                description: "We have set the banner",
            })
            await refetch()
        }
    }

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
                <div>
                    <h6>{item.title}'s images</h6>
                    <div className="flex flex-wrap">
                        {item.images.map((image, index) => (
                            <div key={image.id} className="m-2 border rounded" onClick={() => handleSetBanner(image.id)}>
                                <img src={image.blob_url} alt={item.title} className="h-20 w-20 object-cover" />
                                {noBanner && index == 0 ? <p className="text-center font-bold">Banner</p> : image.is_banner ? <p className="text-center font-bold">Banner</p> : ""}
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageDialog;