import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { FC } from "react";
import { activeStyle } from "./style";

interface Props {
  to: string;
  label: string;
}
const ColumnNavLink: FC<Props> = ({ to, label }) => (
  <Col xs={6}>
    <NavLink activeStyle={activeStyle} to={to}>
      {label}
    </NavLink>
  </Col>
);
export default ColumnNavLink;
