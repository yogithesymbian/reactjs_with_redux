// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <>
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          <>
            {routes.map((route, index) => {
              return (
                <>
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props} key={index}>
                          <route.component {...props} key={index} />
                        </route.layout>
                      );
                    })}
                  />
                </>
              );
            })}
          </>
        </Switch>
      </Router>
    </>
  );
};

export default App;
