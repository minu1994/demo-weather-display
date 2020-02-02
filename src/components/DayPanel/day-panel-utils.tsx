import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faCloudSun,
  faSun
} from "@fortawesome/free-solid-svg-icons";

export const matcherWeather = (main: string) => {
  if (main === "Clear") return <FontAwesomeIcon icon={faSun} />;
  if (main === "Clouds") return <FontAwesomeIcon icon={faCloudSun} />;
  if (main === "Rain") return <FontAwesomeIcon icon={faCloudRain} />;
};
