import React, { ReactNode } from "react";

const PaddingDiv = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: 10 }}>{children}</div>
);

export default PaddingDiv;
