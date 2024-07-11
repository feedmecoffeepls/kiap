import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";


const ImageCarousel = ({ images }: { images: string[] }) => {
    return <Carousel className="w-full ">
        <CarouselContent className="-ml-1">
            {images.map((image, index) => (
                <CarouselItem key={"carousel-image-" + index} className="pl-1 basis-1/2 md:basis-1/3">
                    <AspectRatio ratio={1} className="rounded-xl overflow-hidden">
                        <Image
                            src={image}
                            alt={`Image ${index}`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </AspectRatio>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
}
export default ImageCarousel;   