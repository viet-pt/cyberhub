import { ArticleService } from "api/ArticleService";
import Home from "components/page/Home/Home";

const home = (props) => {
  return <Home {...props} />;
};

async function getNewsList() {
  let res = await ArticleService.getNewsList({});
  if (!res?.length || !Array.isArray(res)) {
    res = [];
  } 
  return res;
}

async function getNewsByCate() {
  let res = await ArticleService.getNewsByCate({});
  if (res?.length && Array.isArray(res)) {
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
      hotNews: hotNews,
      cateList: cateList,
    },
  };
}

export default home;
