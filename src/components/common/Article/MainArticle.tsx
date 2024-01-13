import cn from "clsx";
import Image from "next/image";
import React from "react";
import { IArticle } from "utils/interface";

interface Iprops {
  item: IArticle
  className?: string;
}

const MainArticle = ({ item, className }: Iprops) => {
  return (
    <article className={cn('group hover-news pointer', className)}>
      <div className="overflow-hidden rounded">
        <Image
          alt={item.title}
          src={item.thumnail}
          className='w-full h-auto aspect-[3/2] rounded pointer'
          width={0} height={0}
        />
      </div>
      <h4 className={cn('font-bold mt-4 mb-4 text-2xl lg:text-4xl text-second-black line-clamp-2 h-15 lg:h-[81px] group-hover:text-primary-blue')}>
        {item.title}</h4>
      <p className={cn('medium mb-0 text-gray-400 line-clamp-3 h-13 lg:h-16 hidden lg:block')}>
        {item.description}</p>
    </article>
  );
};

export default React.memo(MainArticle);
