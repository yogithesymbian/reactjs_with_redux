import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { AuthLayout } from "./layouts-auth";

// Route Views
import MonitorBarang from "./views/MonitoringBarang";
import Barang from "./views/Barang";
import Kategori from "./views/Kategori";

import Errors from "./views/Errors";

import Login from "./views/auth/Login";

export default [
  {
    path: "/",
    layout: AuthLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: AuthLayout,
    component: Login
  },
  {
    path: "/barang-monitor",
    layout: DefaultLayout,
    component: MonitorBarang
  },
  {
    path: "/barang",
    layout: DefaultLayout,
    component: Barang
  },
  {
    path: "/kategori",
    layout: DefaultLayout,
    component: Kategori
  },
  {
    path: "/errors",
    layout: AuthLayout,
    component: Errors
  }
];
