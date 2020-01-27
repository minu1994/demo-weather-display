import {
  GERMAN_BERLIN_ID,
  ITALY_MILAN_ID
} from "../../components/utils/ids-from-server";
import {
  CityState,
  EDIT_CITY_OBJECTS,
  EditCityIdAction
} from "../actions/ActiontTypes";

const initState = {
  cityObjects: [
    { value: ITALY_MILAN_ID, label: "Milano" },
    { value: GERMAN_BERLIN_ID, label: "Berlino" }
  ]
};

function cityObjectsReducer(
  state: CityState = initState,
  action: EditCityIdAction
): any {
  switch (action.type) {
    case EDIT_CITY_OBJECTS: {
      return { ...state, cityObjects: action.cityObjects };
    }
  }
  return state;
}

export default cityObjectsReducer;
