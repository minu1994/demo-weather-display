import React, { FC, ReactNode, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import {
  GB_LONDON_ID,
  GERMAN_BERLIN_ID,
  ITALY_MILAN_ID,
  ITALY_ROME_ID
} from "../../Utils/ApiUtils";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_CITY_OBJECTS_ACTION } from "../../store/actions/ActionCreators";

interface Props {
  showModalConfig: boolean;
  setShowModalConfig: (value: boolean) => void;
  setApiID: (value: string) => void;
}

const optionsSelect = [
  { value: ITALY_MILAN_ID, label: "Milano" },
  { value: GERMAN_BERLIN_ID, label: "Berlino" },
  { value: ITALY_ROME_ID, label: "Roma" },
  { value: GB_LONDON_ID, label: "Londra" }
];

export const ConfigurationModal: FC<Props> = ({
  showModalConfig,
  setShowModalConfig,
  setApiID
}) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(
    useSelector((state: any) => state.cityObjectsReducer.cityObjects)
  );
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <Modal show={showModalConfig} onHide={() => setShowModalConfig(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Configurazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DivWithPadding>
          <div>
            <div> Inserisci un API Key: </div>
          </div>
          <input
            style={{ marginTop: 5 }}
            className={"col-12"}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </DivWithPadding>
        <DivWithPadding>
          <div> Inserisci le città da visualizzare:</div>
          <Select
            isMulti={true}
            value={selectedOptions}
            onChange={selOpt => setSelectedOptions(selOpt)}
            options={optionsSelect}
          />
        </DivWithPadding>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setApiID(inputValue);
            dispatch(EDIT_CITY_OBJECTS_ACTION(selectedOptions));
            setShowModalConfig(false);
          }}
          variant="primary"
        >
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const DivWithPadding = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: 10 }}>{children}</div>
);

export default ConfigurationModal;
