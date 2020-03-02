import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";

import Navbar from "./components/Navbar";
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

// auth
import { useAuth } from "./auth/useAuth";
import UserContext from "./auth/UserContext";
//import { ProtectedRoute } from "./auth/ProtectedRoute";

function App() {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  // check src/auth/UserContext =>
  // MANDATORY TO GET/SET loggedin currentUser against server response
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <div className="App">
          {/* <div className="container"> */}
            <Navbar />
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/daymood/new" component={TrackMood} />
              <Route path="/stats" component={Stats} />
              <Route path="/pet" component={Pet} />
              <Route path="*" component={NotFound} />
            </Switch>
          {/* </div> */}
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
