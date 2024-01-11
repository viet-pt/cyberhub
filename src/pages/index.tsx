import Home from "components/page/Home/Home";

const home = (props) => {
  return <Home {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      
    },
  };
}

export default home;
