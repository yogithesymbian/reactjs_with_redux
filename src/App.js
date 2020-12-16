// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

// Route Views
import MonitorBarang from "./views/MonitoringBarang";
import Barang from "./views/Barang";
import Login from "./views/auth/Login";

// Layout Types
import { DefaultLayout } from "./layouts";
import { AuthLayout } from "./layouts-auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "antd/dist/antd.css";

const App = props => {
  const state = useSelector(state => state);

  useEffect(() => {
    console.log("length" + state.auth.length);
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
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={withTracker(props => {
              return (
                <AuthLayout {...props}>
                  <Login {...props} />
                </AuthLayout>
              );
            })}
          />
          <Route
            path="/barang-monitor"
            exact
            component={withTracker(props => {
              return (
                // <DefaultLayout {...props}>
                <MonitorBarang {...props} />
                // </DefaultLayout>
              );
            })}
          />
          {/* <ProtectedRouteLogin
                        path="/"
                        loggedIn={state.auth.length == 0 ? false : state.auth[0].isLogin}
                        component={Login}
                    />
                    <ProtectedRoute
                        path="/barang"
                        loggedIn={state.auth.length == 0 ? false : state.auth[0].isLogin}
                        component={Barang}
                    /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
