import React, {Component, createRef} from "react";
import {Navbar, Row, Col, Alert, Button, Modal} from "react-bootstrap";
import "./RouterNavigator.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect, NavLink
} from "react-router-dom"
import DayPanelContainer from "../DayPanelContainer/DayPanelContainer";

const ColumnNav = ({to, label}: { to: string, label: string }) => (
    <Col xs={6}>
        <NavLink
            activeStyle={{
                fontWeight: "bold", textDecoration: "underline"
            }}
            to={to}>
            {label}
        </NavLink>
    </Col>
)

const WarningDatiFittizi = ({isVisible}: { isVisible: boolean | undefined}) => (
    isVisible ?
        <Alert variant="warning">
            <Alert.Heading>Attenzione</Alert.Heading>
            <p>
                I dati che stai visualizzando sono fittizi.
                Inserire l'api key cliccando su <FontAwesomeIcon icon={faCog}/>
            </p>
        </Alert>
        : null
)

interface States {
    showModalConfig: boolean,
    apiID?: string
}
class RouterNavigator extends Component<{}, States> {

    state: States = {
        showModalConfig: false
    }

    private inputRef = createRef<HTMLInputElement>()

    render() {
    return <Router>
        <div>
            <Navbar bg="dark" variant="dark" style={{justifyContent: "space-between"}}>
                <Navbar.Brand>Demo Weather Display</Navbar.Brand>
                <Button
                    onClick={()=>this.setState({showModalConfig: true})}
                    variant={"secondary"}
                    className={"buttonCogIcon"}>
                    <FontAwesomeIcon className={"cogIcon"} icon={faCog}/>
                </Button>
            </Navbar>

            <Modal show={this.state.showModalConfig} onHide={()=> this.setState({showModalConfig: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Configurazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.showModalConfig && this.state.apiID &&
                        <p> API Key attuale: {this.state.apiID}</p>
                    }
                    <p>
                    Inserisci un API Key:
                    </p>
                    <input ref={this.inputRef}/>

                </Modal.Body>
                <Modal.Footer>

                    <Button
                        onClick={()=>
                            this.inputRef && this.inputRef.current ?
                                this.setState({apiID: this.inputRef.current.value, showModalConfig: false})
                            : undefined}
                        variant="primary" >
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <Row className={"no-gutters"}>
                    <ColumnNav to={"/Today"} label={"Oggi"}/>
                    <ColumnNav to={"/Tomorrow"} label={"Domani"}/>
                </Row>
            </div>

            <WarningDatiFittizi isVisible={!this.state.apiID}/>
            <Switch>
                <Route path="/Today">
                    <DayPanelContainer apiID={this.state.apiID} dayReference={"Today"}/>
                </Route>
                <Route path="/Tomorrow">
                    <DayPanelContainer apiID={this.state.apiID} dayReference={"Tomorrow"}/>
                </Route>
                <Redirect to={"Today"}/>
            </Switch>
        </div>
    </Router>
    }
}


export default RouterNavigator