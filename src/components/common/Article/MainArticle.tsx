import cn from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getLink } from "utils/helpers";
import { IArticle } from "utils/interface";

interface Iprops {
  item: IArticle
  className?: string;
}

const MainArticle = ({ item, className }: Iprops) => {
  return (
    <article className={cn('group hover-news pointer', className)}>
      <div className="overflow-hidden rounded">
        <Link href={getLink(item)}>
          <Image
            alt={item.title}
            src={item.thumbnail}
            className='w-full h-auto aspect-[3/2] rounded pointer'
            width={0} height={0}
          />
        </Link>
      </div>
      <Link href={getLink(item)} className="hover:no-underline">
        <h4 className={cn('font-bold mt-4 mb-4 text-2xl lg:text-4xl lg:leading-[2.8rem] text-second-black line-clamp-2 max-h-15 lg:max-h-[90px] group-hover:text-primary-blue')}>
          {item.title}</h4>
      </Link>
      <p className={cn('mb-0 text-gray-400 line-clamp-3 h-13 lg:h-16 hidden lg:block')}>
        {item.description}</p>
    </article>
  );
};

export default React.memo(MainArticle);
