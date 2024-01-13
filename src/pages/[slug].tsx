import News from "components/page/News/News";

const news = (props) => {
  return <News {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "Title",
    },
  };
}

export default news;
