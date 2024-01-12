import About from "components/page/About/About";

const news = (props) => {
  return <About {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "About",
    },
  };
}

export default news;
