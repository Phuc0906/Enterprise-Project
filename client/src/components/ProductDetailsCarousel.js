import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader'
import { Carousel } from 'react-responsive-carousel';

const ProductDetailsCarousel = () => {
    return <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
        <Carousel
            infiniteLoop={true}
            showIndicators={false}
            showStatus={false}
            thumbWidth={90}
            className="productCarousel"
        >


        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/dddfe7a5-318b-40ea-8374-623b53314ff3/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" />
        <img src= "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ec91f07c-ccff-471a-926a-3c7ec1957870/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" alt="image" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a9c5031b-492a-4bf5-a818-78b142016e03/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" alt="image" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f244fff5-38ed-4a93-8a3e-6e6bf76ca183/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" alt="image" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/013dd5ae-68e0-4491-9eb2-c9ae6062acdf/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" alt="image" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8553adf2-aec3-4919-9fe9-8b9b70f9017e/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" alt="image" />
        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2d51e391-da53-4b21-bedb-c36a7440060c/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image" alt="image" />

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