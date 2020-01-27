import React, { FC, ReactNode } from "react";

interface props {
  children: ReactNode;
}
const PaddingDiv: FC<props> = ({ children }) => (
  <div style={{ padding: 10 }}>{children}</div>
);

export default PaddingDiv;
