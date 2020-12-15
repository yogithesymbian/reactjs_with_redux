import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { AuthLayout } from "./layouts-auth";

// Route Views
import MonitorBarang from "./views/MonitoringBarang";

import Errors from "./views/Errors";

import Login from "./views/auth/Login";

export default [
  {
    path: "/",
    // exact: true,
    layout: AuthLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: AuthLayout,
    component: Login
  },
  // end of home
  // ================================================
  // administrators
  {
    path: "/barang-monitor",
    layout: DefaultLayout,
    component: MonitorBarang
  },
  // end of administrators
  {
    path: "/errors",
    layout: AuthLayout,
    component: Errors
  }
];
