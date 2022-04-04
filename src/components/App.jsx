import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BrowseContainer from './browse_container'
import EditorContainer from './editor/editor_container'
import ViewerContainer from './editor/viewer_container'
import Profile from './home/Profile'
import Dashboard from './dashboard'
import ExternalImageModalContainer from './modal/external_image_modal_container'
import PricingPlans from './Pricingplan'
import CheckoutPage from './checkout'
import UserDashboard from './dashboard/user_dashboard/UserDashboard'
import MobileBrowse from './mobile/Browse/'
import MobileView from './mobile/View/'
import MobileSettings from './mobile/Settings/'

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    const { externalModal, toggleModal } = this.props
    const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
    return (
      <>
        {isMobile ? (
          <div>
            <Switch>
              <Route path="/design/:id" component={MobileView} />
              {/*<Route path="/view/:id" component={ViewerContainer} />*/}
              {/*<Route path="/folder/saved" component={AllDesigns} />*/}
              {/*<Route path="/profile" component={Profile} />*/}
              {/*<Route path="/dashboard" component={Dashboard} />*/}
              <Route path="/settings" component={MobileSettings} />
              <Route path="/" component={MobileBrowse} />
            </Switch>
          </div>
        ) : (
          <div className="main">
            <Switch>
              <Route path="/pricing" component={PricingPlans} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/user/dashboard" component={UserDashboard} />
              <Route path="/design/:id" component={EditorContainer} />
              <Route path="/view/:id" component={ViewerContainer} />
              <Route path="/user/profile" component={Profile} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/trash" component={Dashboard} />
              <Route path="/" component={BrowseContainer} />
            </Switch>
          </div>
        )}
        <ExternalImageModalContainer
          active={externalModal}
          toggleModal={id => toggleModal('externalModal', id)}
          external
        />
      </>
    )
  }
}

export default App
