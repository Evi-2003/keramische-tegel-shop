
import Image from 'next/image';
import getInspiratieFotos from '../data/getInspiratieFotos';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState, useRef } from 'react';
import 'keen-slider/keen-slider.min.css';

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
    {inspiratieFotos.length > 0 && (
      <section ref={sliderRef} className="keen-slider rounded-lg shadow-lg">
        {inspiratieFotos.map((product) => (
          <Image
            src={product.sourceUrl}
            alt={'Afbeelding van een tuin met keramische tegels'}
            width={500}
            quality="50"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            key={product.id}
            priority="high"
            height={500}
            className="keen-slider__slide h-96 w-full object-cover"
          /> 
        ))}
      </section>
    )}
  </>
  );
}
