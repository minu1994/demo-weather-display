import React, { FC, useState } from "react";
import { Navbar, Row, Button } from "react-bootstrap";
import "./RouterNavigator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import WarningDatiFittizi from "../stateless/WarningDatiFittizi";
import ColumnNavLink from "../stateless/ColumnNavLink";
import ConfigurationModal from "../ConfigurationModal";
import DayPanelContainer from "../DayPanelContainer";

interface props {
  // no props
}
const RouterNavigator: FC<props> = () => {
  const [showModalConfig, setShowModalConfig] = useState<boolean>(false);
  const [apiID, setApiID] = useState<string>("");
  return (
    <Router>
      <div>
        <Navbar
          bg="dark"
          variant="dark"
          style={{ justifyContent: "space-between" }}
        >
          <Navbar.Brand>Demo Weather Display</Navbar.Brand>
          <Button
            onClick={() => setShowModalConfig(true)}
            variant={"secondary"}
            className={"buttonCogIcon"}
          >
            <FontAwesomeIcon className={"cogIcon"} icon={faCog} />
          </Button>
        </Navbar>

        <ConfigurationModal
          showModalConfig={showModalConfig}
          setShowModalConfig={setShowModalConfig}
          setApiID={setApiID}
        />

        <div>
          <Row className={"no-gutters"}>
            <ColumnNavLink to={"/Homepage/Today"} label={"Oggi"} />
            <ColumnNavLink to={"/Homepage/Tomorrow"} label={"Domani"} />
          </Row>
        </div>

        <WarningDatiFittizi
          isVisible={!apiID}
          onClickCog={() => setShowModalConfig(true)}
        />
        <Switch>
          <Route
            exact
            path="/Homepage/:dayReference"
            render={(props: any) => (
              <DayPanelContainer {...props} apiID={apiID} />
            )}
          ></Route>
          <Redirect to="/Homepage/Today" />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterNavigator;
