import Search from "components/page/Search/Search";

const search = (props) => {
  return <Search {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "Tìm kiếm",
    },
  };
}

export default search;
