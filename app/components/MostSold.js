
import Image from "next/image";
import getPopulairProducts from "../data/getPopulairProducts";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState, useRef } from "react";

export default function MostSold() {
  const [mostPopulairProducts, setMostPopulairProducts] = useState([]);
  const sliderContainerRef = useRef();
  const timerRef = useRef();

  const [sliderRef] = useKeenSlider({
    loop: true,
    mounted: (slider) => {
      timerRef.current = setInterval(() => {
        if (slider) {
          slider.next();
        }
      }, 2500);
    },
    slideChanged: (slider) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        if (slider) {
          slider.next();
        }
      }, 2000);
    },
  });

  useEffect(() => {
    (async () => {
      const products = await getPopulairProducts();
      setMostPopulairProducts(products);
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return (
    <>
    {mostPopulairProducts.length > 0 && (
      <div ref={sliderRef} className="keen-slider">
        {mostPopulairProducts.map((product) => (
          <div
            key={product.image.sourceUrl}
            className="keen-slider__slide w-full h-fit flex flex-col items-center"
          >
            <Image
              src={product.image.sourceUrl}
              alt={"Afbeelding van de " + product.name}
              width={500}
              height={500}
              quality="50"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              priority="high"  
              className="w-64 h-64 object-scale-down"
            />
            <span className="text-black text-lg p-2">{product.name}</span>
          </div>
        ))}
      </div>
    )}
    </>
  );
}
