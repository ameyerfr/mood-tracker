import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";

import Splash from "./views/Splash";
import NotFound from "./views/NotFound";
import TrackMood from "./views/TrackMood";
import Stats from "./views/Stats";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Pet from "./views/Pet";
import Dashboard from "./views/Dashboard";
import Contacts from "./views/Contacts";

function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Splash} />

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/track" component={TrackMood} />
            <Route path="/pet" component={Pet} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default App;
