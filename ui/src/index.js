import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {HashRouter as Router} from "react-router-dom";
import "moment/locale/cs";

function loadJSON(callback) {

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `${document.baseURI}/config.json`, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

loadJSON((config) =>{
    ReactDOM.render(<Router basename={config.APP_DIRECTORY}><App config={config}/></Router>, document.getElementById("root"));

    //ReactDOM.render(<Router basename={config.APP_DIRECTORY}><App config={config}/></Router>, document.getElementById("root"));
});