import { ArticleService } from "api/ArticleService";
import Category from "components/page/Category/Category";

const category = (props) => {
  return <Category {...props} />;
};

async function getRelateList(q) {
  const data = { q };
  const res = await ArticleService.getRelateList(data);
  return res;
}

export async function getServerSideProps(ctx) {
  const { category } = ctx.query;
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

