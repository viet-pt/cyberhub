import React from "react";

const News = ({ data }) => {
  return (
    <div className="text-base relative">
      <div className="h-[298px] lg:h-auto lg:aspect-[216/112] absolute top-0 left-0 w-full bg-green z-[-1]"></div>
      <div className="pt-40 lg:pt-56">
        <h1>News</h1>
      </div>
    </div>
  );
};

export default React.memo(News);
