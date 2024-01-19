import HorizontalArticle from "@common/Article/HorizontalArticle";
import MainArticle from "@common/Article/MainArticle";
import VerticalArticle from "@common/Article/VerticalArticle";
import Slider from "@common/Slider";
import { Select } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useCateStore } from "store/storeCate";
import { ROUTE } from "utils/constants";
import { replaceCate } from "utils/helpers";

const Home = ({ hotNews, cateList }) => {
  const [cates, setCates] = useState<any>([]);
  const [cateStore] = useCateStore((state) => [state.data]);

  useEffect(() => {
    if (cateStore.length) {
      setCates([
        { cateId: '', cateName: 'Tất cả danh mục' },
        ...cateStore,
      ]);
    }
  }, [cateStore])

  const changeCate = (value, item) => {
    if (value !== '') {
      Router.push(`${ROUTE.CATEGORY}/${replaceCate(item.children)}`);
    }
  }

  return (
    <div className="mt-4">
      <section className="container mobile:px-2">
        <div className="flex space-x-4 justify-end mb-5">
          <Select placeholder="Chọn chủ đề" className='w-44 shadow-5' showSearch={false} defaultValue='' onChange={changeCate}>
            {cates.map(item => (
              <Select.Option value={item.cateId} key={item.cateId}>{item.cateName}</Select.Option>
            ))}
          </Select>
          <Link href={`${ROUTE.CATEGORY}/trending`} className="px-5 py-1.5 bg-primary-orange text-white font-semibold shadow-5 hover:no-underline hover-raise ml-4">Trending</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
          <div className="lg:col-span-2 order-last lg:order-none">
            {hotNews.length > 4 &&
              hotNews.map((item, index) => (
                index >= 3 && index <= 7 &&
                <VerticalArticle key={index} item={item} />
              ))
            }
          </div>

          <div className="lg:col-span-3 order-first lg:order-none">
            {hotNews[0] &&
              <MainArticle item={hotNews[0]} />
            }
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
            {hotNews.length > 2 &&
              hotNews.map((item, index) => (
                index > 0 && index < 3 &&
                <HorizontalArticle key={index} item={item} />
              ))
            }
          </div>
        </div>
      </section>

      {cateList?.length ?
        <section className="mt-10 bg-primary-yellow py-6" data-aos="fade-up">
          <div className="container mobile:px-2">
            <Link href={`${ROUTE.CATEGORY}/${replaceCate(cateList[0].cateName)}`}>
              <h3 className="mb-6 font-bold text-2xl uppercase title" data-aos="fade-left">
                {cateList[0].cateName}</h3>
            </Link>
            <div className="grid lg:grid-cols-2 gap-5">
              <MainArticle item={cateList[0].data[0]} />
              <div className="grid grid-cols-2 gap-5">
                {cateList[0].data.length > 1 &&
                  cateList[0].data.map((item, index) => (
                    index > 0 && index < 5 &&
                    <HorizontalArticle key={index} item={item} />
                  ))
                }
              </div>
            </div>
          </div>
        </section> : null
      }

      {cateList?.length > 1 &&
        cateList.map((cate, index) => (
          index > 0 &&
          <section className="mt-12 mobile:px-2" key={index}>
            <div className="container">
              <Link href={`${ROUTE.CATEGORY}/${replaceCate(cate.cateName)}`} className="border-b border-gray-300 mb-8 block" data-aos="fade-left">
                <h3 className="font-bold text-2xl uppercase title">{cate.cateName}</h3>
              </Link>
              <div data-aos="fade-up">
                <Slider data={cate.data} />
              </div>
            </div>
          </section>
        ))
      }
    </div>
  );
};

export default React.memo(Home);
