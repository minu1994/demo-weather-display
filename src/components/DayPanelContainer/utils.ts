import { CityObject } from "../../store/actions/ActiontTypes";

function getURL(dayReference: string) {
  if (dayReference.toUpperCase() === "TODAY") {
    return "https://api.openweathermap.org/data/2.5/weather?units=metric";
  } else if (dayReference.toUpperCase() === "TOMORROW") {
    return "https://api.openweathermap.org/data/2.5/forecast?units=metric";
  }
  return "";
}

export function isInvalidApiKey(stateCities: any) {
  let isInvalid = false;
  stateCities.forEach((city: any) => {
    if (city && city.cod == 401) {
      isInvalid = true;
    }
  });
  return isInvalid;
}

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

export function getCityDataFromFetch(
  json: any,
  index: number,
  cityIDs: any,
  dayReference: string
) {
  if (json && (json.cod == 401 || json.cod == 404)) {
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
}
