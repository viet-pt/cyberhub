import { IconSearch } from '@common/Icons';
import OutsideClick from '@common/OutsideClick/OutsideClick';
import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ROUTE } from 'utils/constants';

const Header = () => {
  const [fixedHeader, setFixedHeader] = useState(false);
  const [path, setPath] = useState('NEWS');
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [txtSearch, setTxtSearch] = useState('');
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixedHeader]);

  useEffect(() => {
    if (pathname === ROUTE.NEWS) {
      setPath('NEWS');
    } else if (pathname.includes(ROUTE.QUIZ)) {
      setPath('QUIZ');
    } else {
      setPath('');
    }
  }, [pathname]);

  const handleScroll = () => {
    const sticky = document.documentElement.scrollTop;
    if (sticky > 300) {
      setFixedHeader(true);
    } else if (fixedHeader && sticky === 0) {
      setFixedHeader(false);
    }
  }

  const onLogin = () => {
    setOpenModalLogin(true);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  }

  const onSearch = () => {
    if (!txtSearch) {
      setShowSearch(false);
      setShowSearchMobile(false);
    } else {
      setOpenMenu(false);
      Router.push(`${ROUTE.SEARCH}?q=${txtSearch}`);
    }
  }

  const changeSearch = (event) => {
    setTxtSearch(event.target.value.trim());
  }

  return (
    <>
      <section className='header-wrapper hidden lg:block text-primary-black'>
        <div className={`header ${fixedHeader ? 'fixed-header' : ''}`}>
          <div className="container">
            <div className="flex items-center justify-between py-2.5">
              <div className="lg:w-2/5">
                <Link href='/' className='flex items-center hover:no-underline'>
                  <img src="/imgs/logo.png" className='h-14 w-auto' alt="logo" />
                  <h1 className="medium text-3xl mb-0 ml-3">CyberHub</h1>
                </Link>
              </div>

              <div className='flex items-center justify-end space-x-10 text-base medium'>
                <Link href={ROUTE.NEWS} className={cn(`flex-center border border-solid border-gray-300 py-1 px-3 rounded-20 
                  hover:no-underline hover:bg-primary-orange hover:text-white group`, { 'bg-primary-orange text-white': path === 'NEWS' })}>
                  <Image
                    alt='news'
                    src='/imgs/ic-news.png'
                    className='h-4 lg:h-7 w-auto group-hover:animate-ringring'
                    width={0} height={0}
                  />
                  <span className='ml-2'>News</span>
                </Link>
                <Link href={ROUTE.QUIZ} className={cn(`flex-center border border-solid border-gray-300 py-1 px-3 rounded-20 
                  hover:no-underline hover:bg-primary-orange hover:text-white group`, { 'bg-primary-orange text-white': path === 'QUIZ' })}>
                  <Image
                    alt='news'
                    src='/imgs/ic-quiz.webp'
                    className='h-4 lg:h-7 w-auto group-hover:animate-ringring'
                    width={0} height={0}
                  />
                  <span className='ml-2'>Quiz</span>
                </Link>
              </div>

              <div className='flex items-center text-base lg:w-2/5 justify-end'>
                <OutsideClick onClickOutSide={() => setShowSearch(false)}>
                  <div className={cn('border-b border-solid border-gray-400 flex-between py-2 transition-seach',
                    showSearch ? 'visible opacity-100 w-60' : 'invisible opacity-0 w-32')} >
                    <input
                      className='border-none text-sm px-3 outline-none'
                      placeholder='Nhập nội dung cần tìm...'
                      onKeyDown={handleKeyDown}
                      onChange={changeSearch}
                    />
                    <IconSearch className='h-5 pointer hover-scale' onClick={onSearch} />
                  </div>
                </OutsideClick>
                {!showSearch &&
                  <IconSearch className='h-5 pointer hover-scale' onClick={() => setShowSearch(true)} />
                }
                <span className='text-right border-l border-solid border-gray-300 ml-5 pl-5 nav-item' onClick={onLogin}>
                  Đăng nhập</span>
              </div>
            </div>
          </div>
        </div >
      </section >

      <section className="header-wrapper lg:hidden fixed top-0 z-10">
        <div className={`container header h-14 ${openMenu ? 'open-menu' : ''}`}>
          <div className='flex h-full justify-center items-center'>
            <div className="header__close-btn w-1/12" onClick={() => setOpenMenu(!openMenu)}>
              <div />
            </div>
            <Link href="/">
              <img alt="home" src="/imgs/logo.png" className='h-9' />
            </Link>
            <div className='absolute right-2 flex items-center justify-end'>
              <OutsideClick onClickOutSide={() => setShowSearchMobile(false)}>
                <div className={cn('border-b border-solid border-gray-400 flex-between py-2 transition-seach',
                  showSearchMobile ? 'visible opacity-100 w-40' : 'invisible opacity-0 w-20')} >
                  <input
                    className='border-none text-13 px-3 outline-none w-4/5'
                    placeholder='Tìm kiếm...'
                    onKeyDown={handleKeyDown}
                    onChange={changeSearch}
                  />
                  <IconSearch className='h-4 pointer hover-scale' onClick={onSearch} />
                </div>
              </OutsideClick>

              {!showSearchMobile &&
                <>
                  <IconSearch className='h-4 pointer hover-scale' onClick={() => setShowSearchMobile(true)} />
                  <span className='text-right border-l border-solid border-gray-300 ml-2 pl-2 nav-item' onClick={onLogin}>
                    Đăng nhập</span>
                </>
              }
            </div>
          </div>

          <div className="header__menu">
            <div className='flex-center space-x-10 text-base medium mt-10'>
              <Link href={ROUTE.NEWS} onClick={() => setOpenMenu(false)} className={cn(`flex-center border border-solid border-gray-300 py-1 px-3 rounded-20 
                  hover:no-underline hover:bg-primary-orange hover:text-white group`, { 'bg-primary-orange text-white': path === 'NEWS' })}>
                <Image
                  alt='news'
                  src='/imgs/ic-news.png'
                  className='h-4 lg:h-7 w-auto group-hover:animate-ringring'
                  width={0} height={0}
                />
                <span className='ml-2'>News</span>
              </Link>
              <Link href={ROUTE.QUIZ} onClick={() => setOpenMenu(false)} className={cn(`flex-center border border-solid border-gray-300 py-1 px-3 rounded-20 
                  hover:no-underline hover:bg-primary-orange hover:text-white group`, { 'bg-primary-orange text-white': path === 'QUIZ' })}>
                <Image
                  alt='news'
                  src='/imgs/ic-quiz.webp'
                  className='h-4 lg:h-7 w-auto group-hover:animate-ringring'
                  width={0} height={0}
                />
                <span className='ml-2'>Quiz</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Header);
