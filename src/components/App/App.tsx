import React, { FC } from "react";
import "./App.css";
import RouterNavigator from "../RouterNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RootReducer from "../../store/reducers/RootReducer";

const store = createStore(RootReducer);

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterNavigator />
      </div>
    </Provider>
  );
};

export default App;
