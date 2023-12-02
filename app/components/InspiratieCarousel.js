import Image from 'next/image';
import getInspiratieFotos from '../data/getInspiratieFotos';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState, useRef } from 'react';


export default function InspiratieCarousel() {
  const [inspiratieFotos, setInspiratieFotos] = useState([]);
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

    async function fetchData() {
      const data = await getInspiratieFotos();
      setInspiratieFotos(data);
      console.log(data);
    }
    
    fetchData();
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
      <div ref={sliderRef} className="keen-slider w-full">
        {inspiratieFotos.map((product) => (
          <div
            key={product.sourceUrl}
            className="keen-slider__slide w-full"
          >
            <Image
              src={product.sourceUrl}
              alt={'Afbeelding van een tuin met keramische tegels'}
              width={1000}
              priority="high"
              height={1000}
              className="w-full h-96 rounded-lg shadow-lg object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
