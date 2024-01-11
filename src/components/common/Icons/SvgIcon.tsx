import React from "react";

const SvgIcon = ({ name, fill = "none", ...props }) => (
  <svg fill={fill} {...props}>
    <use xlinkHref={`/imgs/sprites.svg#${name}`} />
  </svg>
);

export default SvgIcon;
