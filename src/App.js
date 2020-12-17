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

const App = props => {
  const state = useSelector(state => state);

  useEffect(() => {
    // console.log("length " + state.auth.length);
  }, [state]);

  const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return loggedIn ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: path,
                  error: "You need to login first!"
                }
              }}
            />
          );
        }}
      />
    );
  };

  const ProtectedRouteLogin = ({
    component: Comp,
    loggedIn,
    path,
    ...rest
  }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return !loggedIn ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: path,
                  error: "You need to login first!"
                }
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <div>
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          <div>
            {routes.map((route, index) => {
              return (
                <>
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                </>
              );
            })}
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
