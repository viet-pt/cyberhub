import About from "components/page/About/About";
import React from "react";

const about = (props) => {
  return <About {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "About",
    },
  };
}

export default about;
