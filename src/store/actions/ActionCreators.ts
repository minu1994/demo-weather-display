import { CityObject, EDIT_CITY_OBJECTS } from "./ActiontTypes";

export function EDIT_CITY_OBJECTS_ACTION(cityObjects: Array<CityObject>) {
  return { type: EDIT_CITY_OBJECTS, cityObjects };
}
