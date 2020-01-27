import { GERMAN_BERLIN_ID, ITALY_MILAN_ID } from "./ids-from-server";

export function getMock(cityID: number) {
  if (cityID === ITALY_MILAN_ID) {
    return {
      coord: { lon: 9.19, lat: 45.46 },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      base: "stations",
      main: {
        temp: 8.25,
        pressure: 1009,
        humidity: 93,
        temp_min: 4,
        temp_max: 10.56
      },
      visibility: 10000,
      wind: { speed: 1, deg: 180 },
      rain: {},
      clouds: { all: 0 },
      dt: 1573321295,
      sys: {
        type: 1,
        id: 6742,
        country: "IT",
        sunrise: 1573279992,
        sunset: 1573315256
      },
      timezone: 3600,
      id: 6542283,
      name: "Milan",
      cod: 200
    };
  }
  if (cityID === GERMAN_BERLIN_ID) {
    return {
      coord: { lon: 13.41, lat: 52.52 },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }
      ],
      base: "stations",
      main: {
        temp: 6.65,
        pressure: 1008,
        humidity: 93,
        temp_min: 5.56,
        temp_max: 7.78
      },
      visibility: 10000,
      wind: { speed: 3.6, deg: 250 },
      rain: {},
      clouds: { all: 75 },
      dt: 1573317480,
      sys: {
        type: 1,
        id: 1275,
        country: "DE",
        sunrise: 1573280193,
        sunset: 1573313029
      },
      timezone: 3600,
      id: 2950159,
      name: "Berlin",
      cod: 200
    };
  }
  return undefined;
}
