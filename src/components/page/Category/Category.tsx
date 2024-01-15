import RelateArticle from "@common/Article/RelateArticle";
import React from "react";
import { IArticle } from "utils/interface";

interface Iprops {
  category: string;
  data: IArticle[];
}

const Category = ({ category, data }: Iprops) => {
  return (
    <div className="text-base container py-6 lg:py-10 lg:w-3/4 mx-auto mobile:px-2">
      <h3 className="text-lg lg:text-3xl font-bold mb-5 text-center border-b border-primary-black uppercase pb-3">{category}</h3>
      <div className="lg:w-3/5 mt-8">
        {data.map((item, index) => (
          <RelateArticle item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Category);
