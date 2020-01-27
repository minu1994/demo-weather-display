import React, { FC, useEffect, useState } from "react";
import { Alert, Row } from "react-bootstrap";
import { getMock } from "../utils";
import DayPanel from "../DayPanel";
import { useSelector } from "react-redux";
import {
  getCitiesURL,
  getCityDataFromFetch,
  getCityIDs,
  isInvalidApiKey
} from "./utils";

interface props {
  apiID?: string;
  match: any;
}

const DayPanelContainer: FC<props> = ({ apiID, match }) => {
  const dayReference = match.params.dayReference;

  const cityObjects = useSelector(
    (state: any) => state.cityObjectsReducer.cityObjects
  );
  const cityIDs = getCityIDs(cityObjects);
  const citiesURL = getCitiesURL(cityIDs, dayReference, apiID);
  const [stateCities, setStateCities] = useState<any>(
    cityIDs.map((cityID: number) => getMock(cityID))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("apiid:", apiID);
    if (!apiID) {
      return;
    }
    if (apiID || dayReference) {
      setIsLoading(true);
      Promise.all(citiesURL.map((url: string) => fetch(url)))
        .then(responses => Promise.all(responses.map((res: any) => res.json())))
        .then(jsons => {
          setStateCities(
            jsons.map((json, index) =>
              getCityDataFromFetch(json, index, cityIDs, dayReference)
            )
          );
          setIsLoading(false);
        });
    }
  }, [cityObjects, apiID, dayReference]);

  if (isInvalidApiKey(stateCities)) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Errore</Alert.Heading>
        <p>Api Key non valida. Si prega di reinserirla.</p>
      </Alert>
    );
  }

  if (isLoading) return <div style={{ fontSize: 40 }}> caricamento... </div>;

  return (
    <div style={{ margin: 30 }}>
      <Row>
        {stateCities &&
          stateCities.map((city: any) => {
            return <DayPanel key={city.id} cityData={city} />;
          })}
      </Row>
    </div>
  );
};

export default DayPanelContainer;
