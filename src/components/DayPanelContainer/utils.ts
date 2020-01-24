import { CityObject } from "../../store/actions/ActiontTypes";
import { getURL } from "./DayPanelUtils";

export function getCityIDs(cityObjects: any) {
  return cityObjects
    ? cityObjects.map((cityObj: CityObject) => cityObj.value)
    : [];
}

export function getCitiesURL(
  cityIDs: any,
  dayReference: string,
  apiID: string | undefined
) {
  return cityIDs.map(
    (cityID: number) =>
      getURL(dayReference) + "&appid=" + apiID + "&id=" + cityID
  );
}

export const getCityDataFromFetch = function(
  json: any,
  index: number,
  cityIDs: any,
  dayReference: string
) {
  console.log("json: ", json);
  if (json && (json.cod == 401 || json.cod == 404)) {
    json.cityID = cityIDs[index];
    return json;
  }

  let cityData;
  if (dayReference.toUpperCase() === "TODAY") {
    cityData = json;
  } else {
    cityData = json.list[8];
    cityData.name = json.city.name;
  }
  return cityData;
};
