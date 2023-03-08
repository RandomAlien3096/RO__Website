import * as React from "react";
const SvgCircle = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 550 550"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <circle fill="#333" cx={275} cy={275} r={250} />
  </svg>
);
export default SvgCircle;
