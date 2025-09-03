import * as React from "react";

export const GenfosisLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="120"
    height="30"
    viewBox="0 0 120 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_101_2)">
      <text
        fill="hsl(var(--primary))"
        xmlSpace="preserve"
        style={{ whiteSpace: "pre" }}
        fontFamily="Poppins, sans-serif"
        fontSize="20"
        fontWeight="600"
        letterSpacing="0.05em"
      >
        <tspan x="0" y="22.5">
          GENFOSIS
        </tspan>
      </text>
      <path
        d="M95 15.5L100 15.5L102.5 9.5L105 21.5L107.5 15.5L110 15.5"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_101_2">
        <rect width="120" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
