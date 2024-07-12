"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { SelectItem } from '@/db/schema';
import { UploadDropzone } from "@/lib/uploadthing";
import { createImages } from '@/actions/itemImagesActions';


type PurchaseDialogProps = {
    item: SelectItem;
};

const ImageDialog: React.FC<PurchaseDialogProps> = ({ item }) => {

    const [error, setError] = useState<string | null>(null);
    return (
        <Dialog>
            <DialogTrigger asChild><Button>Manage Images</Button></DialogTrigger>
            <DialogContent >
                <DialogHeader><DialogTitle>Item Images</DialogTitle></DialogHeader>
                <UploadDropzone
                    config={{ mode: "auto" }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log(res);
                        res.forEach(async (file) => {
                            await createImages(item.id, file.url, file.key)
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