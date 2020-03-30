import React from "react";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./components/Details";
import Favourites from "./components/Favourites";
import PrivateRoute from "./components/private";
// import PrivateRoute from "react-private-route";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <PrivateRoute path="/details" component={Details} />
          <PrivateRoute path="/favourites" component={Favourites} />
          <PrivateRoute path="*" component={SearchBar} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
