import cn from "clsx";
import Image from "next/image";
import React from "react";
import { IArticle } from "utils/interface";

interface Iprops {
  item: IArticle
  className?: string;
}

const HorizontalArticle = ({ item, className }: Iprops) => {
  return (
    <article className={cn('group hover-news pointer mb-6', className)}>
      <div className="overflow-hidden rounded">
        <Image
          alt={item.title}
          src={item.thumnail}
          className='w-full h-auto aspect-[5/3] rounded pointer'
          width={0} height={0}
        />
      </div>
      <h4 className={cn('medium mt-3 text-[15px] text-second-black line-clamp-2 h-10 group-hover:text-primary-blue')}>
        {item.title}</h4>
    </article>
  );
};

export default React.memo(HorizontalArticle);
