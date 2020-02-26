import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";

import Splash from "./views/Splash";

function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Splash} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default App;
