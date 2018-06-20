import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import "moment/locale/cs";


fetch(`${document.baseURI}/config.json`).then(r => r.json()).then(json => {
});

ReactDOM.render(<App/>, document.getElementById("root"));
