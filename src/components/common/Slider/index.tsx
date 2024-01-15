import HorizontalArticle from "@common/Article/HorizontalArticle";
import { IconNext, IconPrev } from "@common/Icons";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback } from "react";
import { IArticle } from "utils/interface";

interface ISlider {
  data: IArticle[];
  className?: string;
}

const Slider = ({ data, className }: ISlider) => {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      loop: false,
    },
    [Autoplay()]
  );

  const scrollPrev = useCallback(
    () => embla && embla.scrollPrev(),
    [embla],
  )
  const scrollNext = useCallback(
    () => embla && embla.scrollNext(),
    [embla],
  )

  return (
    <div className={clsx(className, "relative")}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container -mx-2.5 md:-mx-3">
          {data.map((item, index) => (
            <div
              className={clsx("w-1/2 md:w-1/3 lg:w-1/5 shrink-0 px-2.5 md:px-4")}
              key={index}
            >
              <HorizontalArticle item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-[40%] lg:top-[45%] w-8 h-8 lg:w-11 lg:h-11 rounded-full bg-white border border-[#c8cbd0]
          flex-center pointer -translate-x-2 lg:-translate-x-13 shadow-md hover:bg-yellow-50" onClick={scrollPrev}>
        <IconPrev className="text-black w-2 lg:w-3" />
      </div>

      <div className="absolute right-0 top-[40%] lg:top-[45%] w-8 h-8 lg:w-11 lg:h-11 rounded-full bg-white border border-[#c8cbd0]
          flex-center pointer translate-x-2 lg:translate-x-13 shadow-md hover:bg-yellow-50" onClick={scrollNext}>
        <IconNext className="text-black w-2 lg:w-3" />
      </div>

    </div>
  );
};

export default React.memo(Slider);
