import cn from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ROUTE } from "utils/constants";

const TYPE = {
  RANDOM: 'RANDOM',
  TEST: 'TEST',
}

const Quiz = () => {
  const router = useRouter();
  const [type, setType] = useState<any>('');

  useEffect(() => {
    const curentType = router.query.type;
    setType(curentType || '');
  }, [router.query])

  return (
    <div className="text-base relative pt-6 lg:pt-12 mb-28">
      {!type &&
        <section>
          <div className="font-bold text-base lg:text-2xl container">
            <div className="w-5/6 ld:w-2/3 mx-auto">
              <p className="mb-4">Internet mang cả thế giới đến ngôi nhà của bạn, nhưng đồng nghĩa hacker cũng tiếp cận bạn dễ dàng hơn.</p>
              <p className="mb-0">Hãy nâng cao nhận thức an toàn thông tin để tránh các nguy cơ lừa đảo trực tuyến, đánh cắp danh tính hay bị lâ nhiễm phần mềm độc hại... thông qua các câu hỏi trắc nghiệm!</p>
            </div>
          </div>
          <img src="/imgs/banner1.png" className='h-auto w-full mt-3 lg:-mt-12 ' alt="banner1" />
          <div className="flex-center space-x-8 lg:-mt-20 text-center">
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.RANDOM}`} className="border border-primary-orange rounded-20 py-1 w-40 font-semibold hover-raise
         text-primary-orange text-lg hover:no-underline">Ngẫu nhiên</Link>
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.TEST}`} className="border border-primary-orange bg-primary-orange text-white rounded-20 hover-raise
          py-1 w-40 font-semibold text-lg hover:no-underline">Bài thi</Link>
          </div>
        </section>
      }

      {type &&
        <section className="container">
          <div className="flex-center space-x-8 text-center border-b-2 pb-5">
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.RANDOM}`}
              className={cn(`border border-primary-orange py-1 w-40 font-semibold hover-raise text-lg hover:no-underline`,
                type === TYPE.RANDOM ? 'bg-primary-orange text-white' : 'text-primary-orange')}>Ngẫu nhiên</Link>
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.TEST}`}
              className={cn(`border border-primary-orange py-1 w-40 font-semibold hover-raise text-lg hover:no-underline`,
                type === TYPE.TEST ? 'bg-primary-orange text-white' : 'text-primary-orange')}>Bài thi</Link>
          </div>
        </section>
      }
    </div>
  );
};

export default React.memo(Quiz);
