import * as React from "react";

export const GenfosisLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="150"
    height="40"
    viewBox="0 0 150 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text
      fill="hsl(var(--primary))"
      xmlSpace="preserve"
      style={{ whiteSpace: "pre" }}
      fontFamily="Poppins, sans-serif"
      fontSize="24"
      fontWeight="600"
      letterSpacing="0.05em"
    >
      <tspan x="0" y="29.5">
        GENFOSIS
      </tspan>
    </text>
    <path
      d="M118.75 20.625L125 20.625L128.125 13.125L131.25 28.125L134.375 20.625L137.5 20.625"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
