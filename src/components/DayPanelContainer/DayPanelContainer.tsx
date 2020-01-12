import React, {FC, useEffect, useState} from "react";
import {Alert, Col, Row} from "react-bootstrap";
import "./DayPanel.css"
import {fetchAPI} from "../../Utils/API Utils";
import {getMock} from "../../Utils/MockUtils";
import Moment from "react-moment";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faCloudSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'

interface Props {
    dayReference: string,
    apiID?: string
}

// ids from https://openweathermap.org/city/
const ITALY_MILAN_ID: number = 6542283
const GERMAN_BERLIN_ID: number = 2950159

const DayPanelContainer: FC<Props> = ({dayReference, apiID}) => {
    const [milanoData, setMilanoData] = useState<any>(getMock("MILANO"))
    const [berlinoData, setBerlinoData] = useState<any>(getMock("BERLINO"))

    function getURL(dayReference: string) {
        if (dayReference.toUpperCase() === "TODAY") {
            return "https://api.openweathermap.org/data/2.5/weather?units=metric"
        } else if (dayReference.toUpperCase() === "TOMORROW") {
            return "https://api.openweathermap.org/data/2.5/forecast?units=metric"
        }
        return ""
    }

    useEffect(() => {
        if (!apiID) {
            return
        }
        console.log("apiid:", apiID)
        if(apiID || dayReference) {
        //if ((apiID !== propsPrecedenti.apiID) || (dayReference !== propsPrecedenti.dayReference)) {
            fetchAPI(
                getURL(dayReference),
                ITALY_MILAN_ID,
                apiID,
                (json: any) => {
                    let milanoData = undefined

                    if (json && json.cod === 401) {
                        setMilanoData(json)
                        return
                    }

                    if (dayReference.toUpperCase() === "TODAY") {
                        milanoData = json
                    } else {
                        milanoData = json.list[7]
                        milanoData.name = json.city.name
                    }
                    setMilanoData(milanoData)
                }
            );
            fetchAPI(
                getURL(dayReference),
                GERMAN_BERLIN_ID,
                apiID,
                (json: any) => {
                    let berlinoData = undefined

                    if (json && json.cod === 401) {
                        setBerlinoData(json)
                        return
                    }

                    if (dayReference.toUpperCase() === "TODAY") {
                        berlinoData = json
                    } else {
                        berlinoData = json.list[7]
                        berlinoData.name = json.city.name
                    }
                    setBerlinoData(berlinoData)
                });
        }
    }, [apiID, dayReference])


    if ((milanoData && milanoData.cod === 401) ||
        (berlinoData && berlinoData.cod === 401)) {
        return <Alert variant="danger">
            <Alert.Heading>Errore</Alert.Heading>
            <p>
                Api Key non valida. Si prega di reinserirla.
                </p>
            </Alert>
        }
        return <div style={{margin: 30}}>
            <Row>
                <DayPanel cityData={milanoData}/>
                <DayPanel cityData={berlinoData}/>
            </Row>
        </div>
}


const DayPanel = ({cityData}: { cityData: any }) => {

    function matcherWeather(main: string) {
        if (main === "Clear") return <FontAwesomeIcon icon={faSun}/>
        if (main === "Clouds") return <FontAwesomeIcon icon={faCloudSun}/>
        if (main === "Rain") return <FontAwesomeIcon icon={faCloudRain}/>
    }

    return cityData ?
        <Col xs={12} sm={6}>
            <div className={"DayPanel Card"}>
                <section >
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
        : null
}

export default DayPanelContainer