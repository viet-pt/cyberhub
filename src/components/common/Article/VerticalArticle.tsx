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

const VerticalArticle = ({ item, className }: Iprops) => {
  return (
    <article className={cn('group grid grid-cols-5 gap-4 hover-news pointer border-b pb-4 mb-4', className)}>
      <Link href={getLink(item)} className="col-span-2 overflow-hidden rounded font-bold">
        <Image
          alt={item.title}
          src={item.thumbnail}
          className='w-full h-auto aspect-[3/2] rounded pointer'
          width={0} height={0}
        />
      </Link>
      <Link href={getLink(item)} className="col-span-3 hover:no-underline">
        <h4 className={cn('font-bold mb-0 text-second-black line-clamp-3 h-18 leading-6 group-hover:text-primary-blue')}>
          {item.title}</h4>
      </Link>
    </article>
  );
};

export default React.memo(VerticalArticle);
