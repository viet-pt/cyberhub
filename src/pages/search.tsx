import { ArticleService } from "api/ArticleService";
import Search from "components/page/Search/Search";

const search = (props) => {
  return <Search {...props} />;
};

async function getRelateList(q) {
  const data = { q };
  const res = await ArticleService.getRelateList(data);
  return res;
}

export async function getServerSideProps(ctx) {
  const { q } = ctx.query;
  const data = await getRelateList(q);
  
  return {
    props: {
      title: `Tím kiếm từ khóa: ${q}`,
      searchTxt: q,
      data,
    },
  };
}

export default search;

