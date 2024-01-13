import Profile from "components/page/Profile/Profile";

const profile = (props) => {
  return <Profile {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "Cá nhân",
    },
  };
}

export default profile;
