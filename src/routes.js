import React from "react";
import { Switch, Route } from "react-router-dom";

import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Manage from "./Components/Manage/Manage";

export default (
  <Switch>
    <Route component={Auth} exact path="/" />
    <Route component={Dashboard} path="/dash" />
    <Route component={Manage} path="/manage" />
  </Switch>
);