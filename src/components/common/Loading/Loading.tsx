import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLoadingStore } from 'store/storeLoading';

interface Iprogress {
  isLoading?: boolean;
}

const Loading = ({ isLoading }: Iprogress) => {
  const [loading, setLoading] = useState(false);
  const loadingStore = useLoadingStore(state => state.loading);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });

    router.events.on('routeChangeError', () => {
      setLoading(false);
    });
  }, []);


  if (!loading && !isLoading && loadingStore <= 0) {
    return null;
  }

  return (
    <div className='loading flex-center h-screen fixed top-0 w-screen'>
      <div className="lds-spinner">
        {Array(12).fill(0).map((item, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Loading);
