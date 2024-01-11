import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {

  }, []);

  return (
    <div>
      <section>
        <video autoPlay loop muted className="object-cover w-full">
          <source src='https://www.nio.com/cdn-static/mynio/nextjs/images/e63d9123d4a0548dd5df8f9cd23276d6a79e378ae43215887392d35629cf2255/homepage/video-es8-prime.mp4' />
        </video>
      </section>

      <section className="text-center py-[200px]">
        <h2 className="text-5xl">Innovative. Convenient. Rewarding.</h2>
        <p className="text-2xl mt-6">A one-stop-shop covering all your EV needs.</p>
      </section>

      <img className="w-full" src="https://a-cdn.heyxpeng.com/www/public/static/img/home-p3-3.b8f1f3e7.jpg" />


    </div>
  );
};

export default React.memo(Home);
