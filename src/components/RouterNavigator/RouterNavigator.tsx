import React, {FC, useState} from "react";
import {Navbar, Row, Button} from "react-bootstrap";
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
import ConfigurationModal from "./ConfigurationModal";

interface Props {
    // no props
}
const RouterNavigator: FC<Props> = () => {
    const [showModalConfig, setShowModalConfig] = useState<boolean>(false)
    const [apiID, setApiID] = useState<string>("")
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

            <ConfigurationModal
                showModalConfig={showModalConfig}
                setShowModalConfig={setShowModalConfig}
                setApiID={setApiID}/>

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