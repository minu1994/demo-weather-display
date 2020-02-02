import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import "./DayPanel.css";
import { matcherWeather } from "./day-panel-utils";

interface props {
  cityData: any;
}
const DayPanel: FC<props> = ({ cityData }) => {
  console.log("city data: ", cityData);
  if (!cityData) return null;

  if (cityData.cod == 404) {
    return (
      <Col xs={12} sm={6}>
        <div className={"DayPanel Card"}>
          <section style={{ fontSize: "calc(30px + 2vmin)", padding: 20 }}>
            Città non trovata.
            <p style={{ fontSize: "calc(20px + 2vmin)" }}>
              id città: {cityData.id}
            </p>
          </section>
        </div>
      </Col>
    );
  }

  return (
    <Col xs={12} sm={6}>
      <div className={"DayPanel Card"}>
        <section>
          <div className={"wave wave1"} />
          <div className={"wave wave2"} />
          <div className={"wave wave3"} />

          <Row>
            <Col xs={6}>
              <div style={{ fontSize: "calc(50px + 2vmin)" }}>
                {matcherWeather(cityData["weather"][0]["main"])}
              </div>
              <span style={{ fontSize: "calc(10px + 2vmin)" }}>
                <Moment unix format="DD/MM/YYYY HH:mm">
                  {cityData.dt}
                </Moment>
              </span>
            </Col>
            <Col xs={6}>
              <div style={{ fontSize: "calc(25px + 2vmin)" }}>
                {cityData.name}
              </div>
              <span style={{ fontSize: "calc(30px + 2vmin)" }}>
                {cityData.main.temp}°
              </span>
            </Col>
          </Row>
        </section>
      </div>
    </Col>
  );
};

export default DayPanel;
