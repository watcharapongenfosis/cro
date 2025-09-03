import Image from "next/image";
import * as React from "react";

export const GenfosisLogo = (props: { className?: string }) => (
  <Image
    src="https://drive.google.com/file/d/1RZ_bVX4Hsgg56SL42zlh7ZXuKNzZbbRx/view?usp=sharing"
    alt="Genfosis Logo"
    width={150}
    height={40}
    className={props.className}
    data-ai-hint="logo"
  />
);
