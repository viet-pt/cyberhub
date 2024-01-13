import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {

  return (
    <div className='pt-8 mobile:px-3 bg-white'>
      <div className="container">
        <div className="flex justify-center py-20 flex-col md:flex-row">
          <img src="/imgs/img_404.png" alt="404" width="320" height="180" className="mx-auto md:mx-0" />
          <div className="md:ml-12 font-semibold w-full md:w-1/3 mt-5 mt-md-0">
            <p className="text-2xl md:text-3xl px-7 md:px-0 text-center md:text-left">Không tìm thấy nội dung</p>
            <Link href="/" className='hover:no-underline'>
              <button className="bg-primary-green text-white flex items-center px-6 py-2 mt-8 bold
                rounded btn-hover text-base md:text-lg mx-auto md:mx-0">
                Trang chủ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NotFoundPage);
