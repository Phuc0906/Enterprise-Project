import React, {useEffect, useRef, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader'
import { Carousel } from 'react-responsive-carousel';

const ProductDetailsCarousel = ({imageCount, productId, product}) => {
    const IMAGE_URL = `https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/`;
    const [images, setImages] = useState([]);
    const [item, setItem] = useState(0);



    useEffect(() => {
        const urlArr = [];
        for (let i = 0; i < imageCount; i++) {
            urlArr.push(`${IMAGE_URL}${productId}-${i}.png`)
        }
        setImages(urlArr);


    }, [imageCount])

    return <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
        <Carousel
            infiniteLoop={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={true}
            thumbWidth={90}
            className="productCarousel"
        >
            {images.map((image, index) => <img key={index} src={image} alt="image"/>)}

        </Carousel>
    </div>;
}

export default ProductDetailsCarousel;


//        {images?.map((image) =>(
//            <img key={image.id}
//                src={image.url}
//                alt={image.url}
//            />
//        ))}