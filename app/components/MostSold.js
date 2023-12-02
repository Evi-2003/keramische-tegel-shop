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
      <div ref={sliderRef} className="keen-slider mt-5">
        {mostPopulairProducts.map((product) => (
          <div
            key={product.image.sourceUrl}
            className="keen-slider__slide w-full"
          >
            <Image
              src={product.image.sourceUrl}
              alt={"Afbeelding van de " + product.name}
              width={320}
              priority="high"
              height={320}
              className="w-full h-5/6 object-scale-down"
            />
            <span className="text-black text-lg p-2">{product.name}</span>
          </div>
        ))}
      </div>
    )}
    </>
  );
}
