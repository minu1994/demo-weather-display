export function getURL(dayReference: string) {
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
    if (city && city.cod === 401) {
      isInvalid = true;
    }
  });
  return isInvalid;
}
