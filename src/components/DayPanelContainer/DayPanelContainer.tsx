import React, {FC, useEffect, useState} from "react";
import {Alert, Col, Row} from "react-bootstrap";
import "./DayPanel.css"
import {GERMAN_BERLIN_ID, ITALY_MILAN_ID} from "../../Utils/API Utils";
import {getMock} from "../../Utils/MockUtils";
import Moment from "react-moment";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faCloudSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'

interface Props {
    dayReference: string,
    apiID?: string
}



const DayPanelContainer: FC<Props> = ({dayReference, apiID}) => {
    const cities = [ITALY_MILAN_ID, GERMAN_BERLIN_ID]
    const citiesURL = cities.map(cityID => getURL(dayReference) + "&appid=" + apiID + "&id=" + cityID )

    const [stateCities, setStateCities] = useState<any>(cities.map((cityID => getMock(cityID))))
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function getURL(dayReference: string) {
        if (dayReference.toUpperCase() === "TODAY") {
            return "https://api.openweathermap.org/data/2.5/weather?units=metric"
        } else if (dayReference.toUpperCase() === "TOMORROW") {
            return "https://api.openweathermap.org/data/2.5/forecast?units=metric"
        }
        return ""
    }

    function getCityDataFromFetch(json: any) {
        if (json && (json.cod == 401 || json.cod == 404 )) {
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
    useEffect(() => {
        if (!apiID) {
            return
        }
        console.log("apiid:", apiID)
        if(apiID || dayReference) {
            setIsLoading(true)
            Promise.all(citiesURL.map(url=>fetch(url))).then(responses =>
                Promise.all(responses.map(res => res.json()))
            ).then(jsons => {
                setStateCities(
                    jsons.map(json => getCityDataFromFetch(json))
                )
                setIsLoading(false)
            })

        }
    }, [apiID, dayReference])

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
            {stateCities && stateCities.map((city:any) => <DayPanel cityData={city}/>)}
        </Row>
    </div>
}


const DayPanel = ({cityData}: { cityData: any }) => {

    function matcherWeather(main: string) {
        if (main === "Clear") return <FontAwesomeIcon icon={faSun}/>
        if (main === "Clouds") return <FontAwesomeIcon icon={faCloudSun}/>
        if (main === "Rain") return <FontAwesomeIcon icon={faCloudRain}/>
    }

    if(!cityData)
        return null

    if(cityData.cod == 404) {
        return  <Col xs={12} sm={6}>
            <div className={"DayPanel Card"}>
                <section style={{fontSize: "calc(50px + 2vmin)", padding: 20}}> Città non trovata. </section>
            </div>
        </Col>
    }

    return <Col xs={12} sm={6}>
            <div className={"DayPanel Card"}>
                <section>
                    <div className={"wave wave1"}/>
                    <div className={"wave wave2"}/>
                    <div className={"wave wave3"}/>

                <Row>
                    <Col xs={6}>
                        <div style={{fontSize: "calc(50px + 2vmin)"}}>
                            {matcherWeather(cityData["weather"][0]["main"])}
                        </div>
                        <span style={{fontSize: "calc(10px + 2vmin)"}}>
                            <Moment unix format="DD/MM/YYYY HH:mm">{cityData.dt}</Moment> </span>
                    </Col>
                    <Col xs={6}>
                        <div style={{fontSize: "calc(25px + 2vmin)"}}> {cityData.name} </div>
                        <span style={{fontSize: "calc(30px + 2vmin)"}}> {cityData.main.temp}° </span>
                    </Col>
                </Row>
                </section>
            </div>
        </Col>
}

export default DayPanelContainer