import About from "components/page/About/About";

const search = (props) => {
  return <About {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "search",
    },
  };
}

export default search;
