import Quiz from "components/page/Quiz/Quiz";
import { storageKey } from "utils/storageKey";

const quiz = (props) => {
  return <Quiz {...props} />;
};

export async function getServerSideProps(context) {
  const token = context.req.cookies[storageKey.ACCESS_TOKEN];

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      title: "CyberHub - Quiz",
    },
  };
}

export default quiz;
