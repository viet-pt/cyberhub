import About from "components/page/About/About";

const quiz = (props) => {
  return <About {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "About",
    },
  };
}

export default quiz;
