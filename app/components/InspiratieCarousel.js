"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import Image from "next/image";
export default function InspiratieCarousel() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const imageRefs = useRef([]);
  const afbeeldingen = [
    "/inspiratie/1.webp",
    "/inspiratie/2.webp",
    "/inspiratie/3.webp",
    "/inspiratie/4.webp",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            observer.unobserve(lazyImage); // unobserve the current image
          }
        });
      },
      {
        root: sliderRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    imageRefs.current.forEach((imageRef) => observer.observe(imageRef));

    return () => {
      imageRefs.current.forEach((imageRef) => {
        if (imageRef) {
          observer.unobserve(imageRef);
        }
      });
    };
  }, [sliderRef]);

  return (
    <section
      ref={sliderRef}
      className="w-full keen-slider rounded-lg shadow-l relative 2xl:h-[28rem] xl:h-96"
    >
      {afbeeldingen.map((src, index) => (
        <Image
          ref={(el) => (imageRefs.current[index] = el)}
          src={src}
          key={index}
          quality={100}
          width={500}
          height={350}
          alt={`Inspiratie afbeelding ${index + 1}`}
          className="lazy keen-slider__slide object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
        />
      ))}
      <span className="w-fit py-2 px-5 bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 rounded-lg left-0 bottom-0 absolute m-5 text-xl font-medium md:font-semibold">
        Inspiratie
      </span>
    </section>
  );
}
