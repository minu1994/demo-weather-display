import React, {Component} from "react";
import {Alert, Col, Row} from "react-bootstrap";
import "./DayPanel.css"
import {fetchAPI, getMock} from "../../API Utils";
import Moment from "react-moment";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faCloudSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'

interface Props {
    dayReference: string,
    apiID?: string
}

interface States {
    milanoData: any,
    berlinoData: any
}

// ids from https://openweathermap.org/city/
const ITALY_MILAN_ID: number = 6542283
const GERMAN_BERLIN_ID: number = 2950159

class DayPanelContainer extends Component<Props, States> {

    state: States = {
        milanoData: getMock("MILANO"),
        berlinoData: getMock("BERLINO")
    }

    getURL(dayReference: string) {
        if (dayReference.toUpperCase() === "TODAY") {
            return "https://api.openweathermap.org/data/2.5/weather?units=metric"
        } else if (dayReference.toUpperCase() === "TOMORROW") {
            return "https://api.openweathermap.org/data/2.5/forecast?units=metric"
        }
        return ""
    }

    componentDidUpdate(propsPrecedenti: any) {
        const {apiID, dayReference} = this.props
        console.log("apiID: ", apiID)
        if (!apiID) {
            return
        }
        console.log("apiid from componentdidupdate:", apiID)
        if ((apiID !== propsPrecedenti.apiID) ||
            (dayReference !== propsPrecedenti.dayReference)) {
            fetchAPI(
                this.getURL(dayReference),
                ITALY_MILAN_ID,
                apiID,
                (json: any) => {
                    let milanoData = undefined

                    if (json && json.cod === 401) {
                        this.setState({milanoData: json})
                        return
                    }

                    if (dayReference.toUpperCase() === "TODAY") {
                        milanoData = json
                    } else {
                        milanoData = json.list[0]
                        milanoData.name = json.city.name
                    }
                    this.setState({milanoData})
                }
            );
            fetchAPI(
                this.getURL(dayReference),
                GERMAN_BERLIN_ID,
                apiID,
                (json: any) => {
                    let berlinoData = undefined

                    if (json && json.cod === 401) {
                        this.setState({berlinoData: json})
                        return
                    }

                    if (dayReference.toUpperCase() === "TODAY") {
                        berlinoData = json
                    } else {
                        berlinoData = json.list[0]
                        berlinoData.name = json.city.name
                    }
                    this.setState({berlinoData})
                });
        }
    }

    render() {
        const {milanoData, berlinoData} = this.state
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
            </div>
        </Col>
        : null
}

export default DayPanelContainer