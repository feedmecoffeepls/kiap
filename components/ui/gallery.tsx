import Image from "next/image"
import { AspectRatio } from "./aspect-ratio"

const Gallery = ({ images }: { images: string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((image, index) => (
            <AspectRatio ratio={1} key={"image-" + index} className="rounded-xl overflow-hidden">
                <Image
                    src={image}
                    alt={`Image ${index}`}
                    layout="fill"
                    objectFit="cover"
                />
            </AspectRatio>
        ))}
    </div>
)

export default Gallery