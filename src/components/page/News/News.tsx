import RelateArticle from "@common/Article/RelateArticle";
import React from "react";
import { convertTime } from "utils/helpers";
import { IArticle } from "utils/interface";

interface Iprops {
  data: IArticle
  relateList: IArticle[];
}

const News = ({ data, relateList }: Iprops) => {
  return (
    <div className="container">
      <div className="text-base py-6 lg:py-12 lg:w-3/4 mx-auto font-roboto mobile:px-2">
        <h5 className="text-gray-500 uppercase text-lg">{data.cateName}</h5>
        <h1 className="text-black font-semibold mt-3 mb-6 text-3xl lg:text-5xl">{data.title}</h1>

        <div className="lg:w-3/4">
          <p className="text-gray-500 text-xs font-medium mb-4">{convertTime(data.createTime)}</p>
          <p className="text-black mb-6 font-semibold">{data.description}</p>
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="border-b pb-12"></div>

          <div>
            <p className="font-bold text-2xl uppercase title mt-8 mb-8">Bài viết liên quan</p>
            {relateList.map((item, index) => (
              <RelateArticle item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(News);
