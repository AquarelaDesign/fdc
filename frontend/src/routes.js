import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login'

import Main from './pages/main'
import ComponentBuilder from './pages/ComponentBuilder'
import ExamplesWithJSX from './pages/ExamplesWithJSX'
// import Etiquetas fro./pages/etiquetas/Etiquetas
import DashboardV2 from './pages/rebuilds/DashboardV2'
import ChartJS from './pages/rebuilds/charts/ChartJS'
import Widgets from './pages/rebuilds/Widgets'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={Main} exact />
        <Route path="/dashboardv2" component={DashboardV2} exact />
        <Route path="/component-builder" component={ComponentBuilder} />
        <Route path="/examples-with-jsx" component={ExamplesWithJSX} />
        <Route path="/chart-js" component={ChartJS} exact />
        <Route path="/widgets" component={Widgets} exact />
      </Switch>
    </BrowserRouter>
  )
}
