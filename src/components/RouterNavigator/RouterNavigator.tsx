import React, {FC, useRef, useState} from "react";
import {Navbar, Row, Button, Modal} from "react-bootstrap";
import "./RouterNavigator.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom"
import DayPanelContainer from "../DayPanelContainer/DayPanelContainer";
import WarningDatiFittizi from "./WarningDatiFittizi";
import ColumnNavLink from "./ColumnNavLink";

interface Props {
    // no props
}
const RouterNavigator: FC<Props> = () => {
    const [showModalConfig, setShowModalConfig] = useState<boolean>(false)
    const [apiID, setApiID] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    return <Router>
        <div>
            <Navbar bg="dark" variant="dark" style={{justifyContent: "space-between"}}>
                <Navbar.Brand>Demo Weather Display</Navbar.Brand>
                <Button
                    onClick={() => setShowModalConfig(true)}
                    variant={"secondary"}
                    className={"buttonCogIcon"}>
                    <FontAwesomeIcon className={"cogIcon"} icon={faCog}/>
                </Button>
            </Navbar>

            <Modal show={showModalConfig} onHide={()=> setShowModalConfig(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Configurazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showModalConfig && apiID &&
                        <p> API Key attuale: {apiID}</p>
                    }
                    <p>
                    Inserisci un API Key:
                    </p>
                    <input className={"col-12"} ref={inputRef}/>

                </Modal.Body>
                <Modal.Footer>

                    <Button
                        onClick={() => {
                            if(inputRef && inputRef.current) {
                                setApiID(inputRef.current.value)
                                setShowModalConfig(false)
                            }
                        }}
                        variant="primary" >
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <Row className={"no-gutters"}>
                    <ColumnNavLink to={"/Today"} label={"Oggi"}
                    />
                    <ColumnNavLink to={"/Tomorrow"} label={"Domani"}
                    />
                </Row>
            </div>

            <WarningDatiFittizi
                isVisible={!apiID}
                onClickCog={() => setShowModalConfig(true)}
            />
            <Switch>
                <Route path="/Today">
                    {<DayPanelContainer apiID={apiID} dayReference={"Today"}  />}
                </Route>
                <Route path="/Tomorrow">
                    {<DayPanelContainer apiID={apiID} dayReference={"Tomorrow"}/>}
                </Route>
                <Redirect to={"Today"}/>
            </Switch>
        </div>
    </Router>
}

export default RouterNavigator