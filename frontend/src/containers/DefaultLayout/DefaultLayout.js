import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
// import Lottie from 'react-lottie';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

import api from '../../services/api'

// import * as animationData from '../../assets/json/1204-car.json'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  componentDidMount() {
    const token = localStorage.getItem('@fdc/token')
    const email = localStorage.getItem('@fdc/email')
    
    async function validateToken(props) {
      const response = await api.post('/oapi/validateToken', {
        email, token
      })

      if (!response.data.valid) {
        console.log('validateToken', response.data.valid)
        props.history.push('/login')
      }
    }
    validateToken(this.props)
  }

  /*
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  loading = () => <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                    isStopped={false}
                    isPaused={false}/>
  */
 
  loading = () => <div className="animated fadeIn pt-1 text-center">Carregando...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  redireciona(e) {
    e.preventDefault()
    const input = e.target
    const value = input.value
    this.props.history.push(`/${value}`)
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)} onRedirect={e=>this.redireciona(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar minimized display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
