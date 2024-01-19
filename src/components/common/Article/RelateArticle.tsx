import cn from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { convertTime, getLink } from "utils/helpers";
import { IArticle } from "utils/interface";

interface Iprops {
  item: IArticle
  className?: string;
}

const RelateArticle = ({ item, className }: Iprops) => {
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

      <div className="col-span-3">
        <Link href={getLink(item)} className="hover:no-underline">
          <h4 className={cn('font-bold mb-0 text-second-black line-clamp-2 text-base lg:text-2xl max-h-12 lg:max-h-16 group-hover:text-primary-blue')}>
            {item.title}</h4>
        </Link>

        <div className="flex space-x-4 mt-3 text-[11px] lg:text-[12px]">
          <p className="text-gray-400">{convertTime(item.createTime)}</p>
          <p className="uppercase">{item.cateName}</p>
        </div>

        <p className={cn('mt-3 mb-0 text-gray-400 line-clamp-3 h-13 lg:h-18 mobile:hidden')}>
          {item.description}</p>
      </div>
    </article>
  );
};

export default React.memo(RelateArticle);
