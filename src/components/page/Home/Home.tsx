import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {

  }, []);

  return (
    <div>
      <section className="text-center py-[200px]">
        <h2 className="text-5xl">Innovative. Convenient. Rewarding.</h2>
        <p className="text-2xl mt-6">A one-stop-shop covering all your EV needs.</p>
      </section>

      <img className="w-full" src="https://a-cdn.heyxpeng.com/www/public/static/img/home-p3-3.b8f1f3e7.jpg" />


    </div>
  );
};

export default React.memo(Home);
