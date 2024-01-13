import Quiz from "components/page/Quiz/Quiz";

const quiz = (props) => {
  return <Quiz {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "CyberHub - Quiz",
    },
  };
}

export default quiz;
