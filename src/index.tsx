import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { AudioProvider } from "./contexts/audio";

ReactDOM.render(
  <AudioProvider>
    <App />
  </AudioProvider>,
  document.getElementById("root")
);
