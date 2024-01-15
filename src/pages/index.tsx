import { ArticleService } from "api/ArticleService";
import Home from "components/page/Home/Home";

const home = (props) => {
  return <Home {...props} />;
};

async function getNewsList() {
  const res = await ArticleService.getNewsList({});
  return res;
}

async function getNewsByCate() {
  let res = await ArticleService.getNewsByCate({});
  if (res?.length) {
    res = res.filter(item => item.data?.length);
  } else {
    res = [];
  }
  return res;
}

export async function getServerSideProps() {
  const [hotNews, cateList] = await Promise.all([getNewsList(), getNewsByCate()]);

  return {
    props: {
      hotNews,
      cateList,
    },
  };
}

export default home;
