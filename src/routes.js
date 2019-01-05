import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import HomePage from 'pages/DefaultPages/HomePage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
      // Default Pages

    '/login': {
        component: loadable(() => import('pages/DefaultPages/LoginPage')),
    },

    '/empty': {
        component: loadable(() => import('pages/DefaultPages/EmptyPage')),
    },
    '/unsubscribe': {
        component: loadable(() => import('pages/EmailUnsubscribe/')),
    },


    // Dashboards
    '/dashboard': {
      component: loadable(() => import('pages/Dashboard/DashboardAlphaPage')),
    },

    // Registration Page
    '/auth/register': {
        component: loadable(() => import('pages/DefaultPages/RegisterPage')),
    },

    // Connect Seller Account
    '/connectselleraccount': {
      component: loadable(() => import('pages/ConnectSellerAccount')),
    },

    // Order Page
    '/orders': {
        component: loadable(() => import('pages/OrdersPage')),
    },

    // Feedback Page
    '/feedback': {
        component: loadable(() => import('pages/FeedbackPage')),
    },

    // Feedback Page
    '/products': {
        component: loadable(() => import('pages/ProductPage')),
    },

    // Edit Profile Page
    '/profile': {
        component: loadable(() => import('pages/ProfilePage')),
    },

    // Edit Profile Page
    '/templates': {
        component: loadable(() => import('pages/Templates')),
    },

    '/templates/create': {
        component: loadable(() => import('pages/TemplateCreate')),
    },

    '/templates/edit/:id': {
        component: loadable(() => import('pages/TemplateModify')),
    },

    // Edit Profile Page
    '/campaigns': {
        component: loadable(() => import('pages/EmailCampaign')),
    },

    '/campaigns/add': {
        component: loadable(() => import('pages/EmailCampaignAdd')),
    },
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
