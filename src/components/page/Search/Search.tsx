import RelateArticle from "@common/Article/RelateArticle";
import React from "react";
import { IArticle } from "utils/interface";

interface Iprops {
  searchTxt: string;
  data: IArticle[];
}

const Search = ({ searchTxt, data }: Iprops) => {
  return (
    <div className="text-base container py-6 lg:py-8 lg:w-3/4 mx-auto mobile:px-2">
      <h3 className="text-lg lg:text-3xl font-bold title mb-5">Tìm kiếm</h3>
      <p>Từ khóa: <b>{searchTxt}</b></p>

      <div className="lg:w-3/5 mt-8">
        {data?.length ?
          <>
            {data.map((item, index) => (
              <RelateArticle item={item} key={index} />
            ))}
          </> :
          <div className="text-center bg-gray-100 text-xl py-10">
            Không tìm thấy kết quả
          </div>
        }
      </div>
    </div>
  );
};

export default React.memo(Search);
