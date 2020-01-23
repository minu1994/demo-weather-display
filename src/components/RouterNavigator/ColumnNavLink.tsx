import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { FC } from "react";

interface Props {
  to: string;
  label: string;
}

const ColumnNavLink: FC<Props> = ({ to, label }) => (
  <Col xs={6}>
    <NavLink
      activeStyle={{
        fontWeight: "bold",
        textDecoration: "underline",
        color: "white",
        borderRadius: 20,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 0,
        background: "#3586ff"
      }}
      to={to}
    >
      {label}
    </NavLink>
  </Col>
);

export default ColumnNavLink;
