import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TestDB from "./components/TestDB";
import Login from "./components/LoginJava";
import Worklist from "./components/worklist";
import Result from "./components/Result";
import WorkListU2 from "./components/WorkListU2";
import HomeU2 from "./components/HomeU2";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Home" component={TestDB} />
      <Route path="/Worklist" component={Worklist} />
      <Route path="/Result" component={Result} />
      <Route path="/HomeU2" component={HomeU2} />
      <Route path="/WorkListU2" component={WorkListU2} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
