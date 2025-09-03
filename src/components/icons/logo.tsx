import Image from "next/image";
import * as React from "react";

export const GenfosisLogo = (props: { className?: string }) => (
  <Image
    src="https://picsum.photos/150/40"
    alt="Genfosis Logo"
    width={150}
    height={40}
    className={props.className}
    data-ai-hint="logo"
  />
);