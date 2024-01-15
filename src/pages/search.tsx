import { ArticleService } from "api/ArticleService";
import Search from "components/page/Search/Search";

const search = (props) => {
  return <Search {...props} />;
};

async function getRelateList(txtSearch) {
  const params = { txtSearch };
  const res = await ArticleService.getNewsList({ params });
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

