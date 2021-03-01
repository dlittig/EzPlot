import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../store/Store";
import Dropzone from "../components/Dropzone";

const App: FC = () => (
  <Provider store={store}>
    <Dropzone />
  </Provider>
);

export default App;
