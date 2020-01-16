export const EDIT_CITY_OBJECTS = "EDIT_CITY_OBJECTS"

export interface CityObject {
    value: number,
    label: string
}
export interface CityState {
    cityObjects: Array<CityObject>
}
export interface EditCityIdAction {
    type: typeof EDIT_CITY_OBJECTS,
    cityObjects: Array<CityObject>
}

