import { ArticleService } from "api/ArticleService";
import Category from "components/page/Category/Category";

const category = (props) => {
  return <Category {...props} />;
};

async function getRelateList(cateName) {
  const params = cateName === 'trending' ? { order_by: 'trending' } : { cateName };
  const res = await ArticleService.getNewsList({ params });
  return res;
}

export async function getServerSideProps(ctx) {
  let { category } = ctx.query;
  category = category.replace(/-/g, ' ');
  const data = await getRelateList(category);

  return {
    props: {
      title: category,
      category,
      data,
    },
  };
}

export default category;

