"use client";
import Image from "next/image";
import getInspiratieFotos from "../data/getInspiratieFotos";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState, useRef } from "react";
import "keen-slider/keen-slider.min.css";
import inspiratieAfbeelding1 from "../../public/inspiratie/1.webp";
import inspiratieAfbeelding2 from "../../public/inspiratie/2.webp";
import inspiratieAfbeelding3 from "../../public/inspiratie/3.webp";
import inspiratieAfbeelding4 from "../../public/inspiratie/4.webp";
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
          }, 3000);
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
  const afbeeldingen = [
    inspiratieAfbeelding1,
    inspiratieAfbeelding2,
    inspiratieAfbeelding3,
    inspiratieAfbeelding4,
  ];
  return (
    <>
      {afbeeldingen.length > 0 && (
        <section
          ref={sliderRef}
          className="w-full keen-slider rounded-lg shadow-l relative 2xl:h-[28rem] xl:h-96"
        >
          {afbeeldingen.map((product, index) => (
            <Image
              src={product}
              alt={"Afbeelding van een tuin met keramische tegels"}
              width={800}
              quality="100"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              priority="high"
              height={400}
              className="h-96 w-full object-cover keen-slider__slide"
              key={index}
            />
          ))}
          <span className="absolute bottom-0 left-0 z-10 bg-slate-50 text-slate-950 px-5 py-1 m-5 shadow-xl text-xl font-medium">
            Inspiratie
          </span>
        </section>
      )}
    </>
  );
}
