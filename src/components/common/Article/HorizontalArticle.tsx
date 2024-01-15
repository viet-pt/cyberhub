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

const HorizontalArticle = ({ item, className }: Iprops) => {
  return (
    <article className={cn('group hover-news pointer mb-6', className)}>
      <div className="overflow-hidden rounded">
        <Link href={getLink(item)}>
          <Image
            alt={item.title}
            src={item.thumnail}
            className='w-full h-auto aspect-[5/3] rounded pointer'
            width={0} height={0}
          />
        </Link>
      </div>
      <Link href={getLink(item)} className="hover:no-underline">
        <h4 className={cn('font-bold mt-3 lg:text-[15px] text-second-black line-clamp-2 h-10 lg:h-12 lg:leading-6 group-hover:text-primary-blue')}>
          {item.title}</h4>
      </Link>
    </article>
  );
};

export default React.memo(HorizontalArticle);
