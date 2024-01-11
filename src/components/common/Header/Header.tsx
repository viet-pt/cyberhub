import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [fixedHeader, setFixedHeader] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixedHeader]);

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

  const onLogout = () => {
    // cookies.remove('token');
    // dispatch(removeUser());
  }

  return (
    <>
      <section className='header-wrapper hidden lg:block'>
        <div className={`header ${fixedHeader ? 'fixed-header' : ''}`}>
          <div className="container">
            <div className="flex items-center py-3">
              <div className="lg:w-2/5">
                <Link href='/' className='flex items-center hover:no-underline'>
                  <img src="/imgs/logo.png" className='h-14 w-auto' alt="logo" />
                  <h1 className="medium text-primary-black text-3xl mb-0 ml-3">CyberHub</h1>
                </Link>
              </div>

              <div className='flex items-center justify-end space-x-9 lg:w-3/5'>
                <div><Link href='/dich-vu' className='nav-item'>IDS_SERVICE</Link></div>
                <div><Link href='/faq' className='nav-item'>IDS_FAQ</Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="header-wrapper lg:hidden fixed top-0 z-10">
        <div className={`container header h-14 ${openMenu ? 'open-menu' : ''}`}>
          <div className='flex h-full justify-center items-center bg-prime-blue'>
            <div className="header__close-btn w-1/12" onClick={() => setOpenMenu(!openMenu)}>
              <div />
            </div>
            <Link href="/">
              <img alt="home" src="/imgs/logo.png" className='h-9' />
            </Link>
          </div>

          <div className="header__menu">
            <div className='p-4 border-b text-base medium'><Link href='/dich-vu'>IDS_SERVICE</Link></div>
            <div className='p-4 border-b text-base medium'><Link href='/faq'>IDS_FAQ</Link></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Header);
