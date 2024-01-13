import cn from "clsx";
import Image from "next/image";
import React from "react";
import { IArticle } from "utils/interface";

interface Iprops {
  item: IArticle
  className?: string;
}

const VerticalArticle = ({ item, className }: Iprops) => {
  return (
    <article className={cn('group grid grid-cols-5 gap-4 hover-news pointer border-b pb-4 mb-4', className)}>
      <div className="col-span-2 overflow-hidden rounded">
        <Image
          alt={item.title}
          src={item.thumnail}
          className='w-full h-auto aspect-[3/2] rounded pointer'
          width={0} height={0}
        />
      </div>
      <h4 className={cn('col-span-3 medium mb-0 text-second-black line-clamp-3 h-16 leading-5 group-hover:text-primary-blue')}>
        {item.title}</h4>
    </article>
  );
};

export default React.memo(VerticalArticle);
