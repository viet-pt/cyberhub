import { ArticleService } from "api/ArticleService";
import News from "components/page/News/News";

const news = (props) => {
  return <News {...props} />;
};

async function getNewsDetail(id) {
  const data = { id };
  const res = await ArticleService.getAricleDetail(data);
  return res;
}

async function getRelateList(id) {
  const data = { id };
  const res = await ArticleService.getRelateList(data);
  return res;
}

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  const id = slug.split('-').pop();
  const [data, relateList] = await Promise.all([getNewsDetail(id), getRelateList(id)]);
  
  return {
    props: {
      title: data?.title,
      data,
      relateList,
    },
  };
}

export default news;
