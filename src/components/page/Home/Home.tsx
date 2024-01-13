import HorizontalArticle from "@common/Article/HorizontalArticle";
import MainArticle from "@common/Article/MainArticle";
import VerticalArticle from "@common/Article/VerticalArticle";
import React, { useEffect } from "react";

const Home = ({ hotList }) => {
  useEffect(() => {

  }, []);

  return (
    <div className="mt-4">
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
          <div className="lg:col-span-2 order-last lg:order-none">
            {hotList.length > 4 &&
              hotList.map((item, index) => (
                index >= 3 && index <= 7 &&
                <VerticalArticle key={index} item={item} />
              ))
            }
          </div>

          <div className="lg:col-span-3 order-first lg:order-none">
            {hotList[0] &&
              <MainArticle item={hotList[0]} />
            }
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
            {hotList.length > 2 &&
              hotList.map((item, index) => (
                index > 0 && index < 3 &&
                <HorizontalArticle key={index} item={item} />
              ))
            }
          </div>

        </div>
      </section>

      <section className="mt-10 bg-primary-yellow py-6" data-aos="fade-up">
        <div className="container">
          <h3 className="mb-6 font-bold text-2xl uppercase title">MULTIMEDIA</h3>
          <div className="grid grid-cols-2 gap-5">
            <MainArticle item={hotList[0]} />
            <div className="grid grid-cols-2 gap-5">
              {hotList.length > 1 &&
                hotList.map((item, index) => (
                  index > 0 && index < 5 &&
                  <HorizontalArticle key={index} item={item} />
                ))
              }
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8" data-aos="fade-left">
        <div className="container">
          <div className="border-b border-gray-300 mb-8">
            <h3 className="font-bold text-2xl uppercase title">KINH DOANH</h3>
          </div>
          <div className="grid grid-cols-5 gap-5">
            <HorizontalArticle item={hotList[0]} />
          </div>
        </div>
      </section>

      <section className="mt-8" data-aos="fade-right">
        <div className="container">
          <div className="border-b border-gray-300 mb-8">
            <h3 className="font-bold text-2xl uppercase title">BOOKS</h3>
          </div>
          <div className="grid grid-cols-5 gap-5">
            <HorizontalArticle item={hotList[0]} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default React.memo(Home);
