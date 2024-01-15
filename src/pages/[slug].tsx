import { ArticleService } from "api/ArticleService";
import News from "components/page/News/News";
import NotFoundPage from "components/page/NotFoundPage/NotFoundPage";

const news = (props) => {
  if (props.data) {
    return <News {...props} />;
  } else {
    return <NotFoundPage />
  }

};

async function getNewsDetail(id) {
  const res = await ArticleService.getNewsDetail(id);
  return res;
}

async function getRelateList(cateId) {
  const params = { cateId };
  const res = await ArticleService.getNewsList({ params });
  return res;
}

export async function getServerSideProps(ctx) {
  let slug = ctx.query.slug.split('-');
  const id = slug.pop();
  const cateId = slug.pop();
  const [detail, relateList] = await Promise.all([getNewsDetail(id), getRelateList(cateId)]);

  return {
    props: {
      title: detail?.data?.title || '',
      data: detail?.data || '',
      relateList,
    },
  };
}

export default news;
