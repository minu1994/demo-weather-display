import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";

interface props {
  isVisible: boolean | undefined;
  onClickCog: () => void;
}
const WarningDatiFittizi: FC<props> = ({ isVisible, onClickCog }) => {
  if (!isVisible) return null;
  return (
    <Alert variant="warning">
      <Alert.Heading>Attenzione</Alert.Heading>
      <p>
        I dati che stai visualizzando sono fittizi. Inserire l'api key cliccando
        su{" "}
        <span onClick={onClickCog}>
          <FontAwesomeIcon icon={faCog} />
        </span>
        .
        <br />
        L'api key è reperibile dal sito https://openweathermap.org/api
      </p>
    </Alert>
  );
};

export default WarningDatiFittizi;
