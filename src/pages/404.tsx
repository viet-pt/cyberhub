import React from 'react';
import Layout from '@common/Layout/Layout';
import NotFoundPage from 'components/page/NotFoundPage/NotFoundPage';

const notfound = () => {
  return (
    <NotFoundPage />
  )
}

notfound.getLayout = (page) => <Layout title="404 - Page Not Found">{page}</Layout>

export default notfound;
