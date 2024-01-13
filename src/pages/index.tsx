import Home from "components/page/Home/Home";
import { HOT_NEWS } from "utils/constants";

const home = (props) => {
  return <Home {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      hotList: HOT_NEWS
    },
  };
}

export default home;
