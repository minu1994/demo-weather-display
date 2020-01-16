import React, {FC, useEffect, useState} from "react";
import {Alert, Row} from "react-bootstrap";
import {getMock} from "../../Utils/MockUtils";
import DayPanel from "./DayPanel";
import { useSelector } from "react-redux";
import {CityObject} from "../../store/actions/ActiontTypes";

interface Props {
    dayReference: string,
    apiID?: string
}

const DayPanelContainer: FC<Props> = ({dayReference, apiID}) => {
    const cityObjects = useSelector((state: any) => state.cityObjectsReducer.cityObjects)

    // cityIDs viene inizializzato ad Array Vuoto in caso nessuna città viene fornita dalla configurazione
    let cityIDs = cityObjects ? cityObjects.map((cityObj: CityObject) => cityObj.value) : []
    let citiesURL = [...cityIDs.map((cityID: number) => getURL(dayReference) + "&appid=" + apiID + "&id=" + cityID )]

    let [stateCities, setStateCities] = useState<any>(cityIDs.map(( (cityID: number) => getMock(cityID))))

    const [isLoading, setIsLoading] = useState<boolean>(false)

    function getURL(dayReference: string) {
        if (dayReference.toUpperCase() === "TODAY") {
            return "https://api.openweathermap.org/data/2.5/weather?units=metric"
        } else if (dayReference.toUpperCase() === "TOMORROW") {
            return "https://api.openweathermap.org/data/2.5/forecast?units=metric"
        }
        return ""
    }


    useEffect(() => {

        function getCityDataFromFetch(json: any, index: number) {
            if (json && (json.cod == 401 || json.cod == 404 )) {
                json.cityID = cityIDs[index]
                return json
            }

            let cityData = undefined
            if (dayReference.toUpperCase() === "TODAY") {
                cityData = json
            } else {
                cityData = json.list[7]
                cityData.name = json.city.name
            }
            return cityData
        }
        console.log("apiid:", apiID)

        if (!apiID) {
            return
        }
        if(apiID || dayReference) {
            setIsLoading(true)
            Promise.all(citiesURL.map((url: string) =>fetch(url))).then(responses =>
                Promise.all(responses.map( (res: any) => res.json()))
            ).then(jsons => {
                setStateCities(
                    jsons.map((json, index) => getCityDataFromFetch(json, index))
                )
                setIsLoading(false)
            })
        }
    }, [cityObjects, apiID, dayReference])

    function isInvalidApiKey() {
        let isInvalid = false
        stateCities.forEach((city:any) => {
            if (city && city.cod == 401) {
                isInvalid = true
            }
        })
        return isInvalid
    }

    if (isInvalidApiKey()) {
        return <Alert variant="danger">
            <Alert.Heading>Errore</Alert.Heading>
            <p>
                Api Key non valida. Si prega di reinserirla.
            </p>
        </Alert>
    }
    if(isLoading)
        return <div style={{fontSize: 40}}> caricamento... </div>
    return <div style={{margin: 30}}>
        <Row>
            {stateCities && stateCities.map((city:any, index:number) => <DayPanel key={index} cityData={city}/>)}
        </Row>
    </div>
}

export default DayPanelContainer