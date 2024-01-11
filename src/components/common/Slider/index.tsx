import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

interface ISlider {
  data: any[];
  itemClassName?: string;
  onClick?: any;
}

const Slider = ({ data, itemClassName, onClick }: ISlider) => {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      loop: true,
    },
    [Autoplay()]
  );

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container -mx-2.5 md:-mx-10">
        {data.map((item, index) => (
          <div
            className={clsx(
              "w-full md:w-1/2 shrink-0 px-2.5 md:px-10",
              itemClassName
            )}
            key={index}
          >
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Slider);
