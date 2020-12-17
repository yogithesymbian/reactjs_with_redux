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
    <ProtectedRoute
      path="/barang-monitor"
      loggedIn={state.auth.length == 0 ? false : state.auth[0].isLogin}
      component={withTracker(props => {
        return (
          <DefaultLayout {...props}>
            <MonitorBarang {...props} />
          </DefaultLayout>
        );
      })}
    />
    {/* <ProtectedRouteLogin
    path="/"
    loggedIn={state.auth.length == 0 ? false : state.auth[0].isLogin}
    component={Login}
  /> */}
    {/* <ProtectedRoute
    path="/barang"
    loggedIn={state.auth.length == 0 ? false : state.auth[0].isLogin}
    component={Barang}
  /> */}
  </Switch>
</Router>;
