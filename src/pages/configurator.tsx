import React from "react";
import Configurator from "components/page/Configurator/Configurator";

const configurator = (props) => {
  return <Configurator {...props} />;
};

export async function getServerSideProps() {
  return {
    props: {
      title: "BUILD YOUR XPENG",
    },
  };
}

export default configurator;
