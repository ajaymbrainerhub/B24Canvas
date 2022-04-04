import React, { useState, useEffect } from 'react'
import SVG from 'react-inlinesvg'
import NavBar from '../NavBar'
import Pending from './pending_templates/Pending'
import Customers from './Customers'
import DashBoard from './user_dashboard/UserDashboard'
import customersIcon from './assets/customers.svg'
import dashboardIcon from './assets/dashboard.svg'
import reportsIcon from './assets/reports.svg'
import { connect } from 'react-redux'
import { updateDesign, requestTemplates } from '../../actions/design_actions'

function Index({ templates, getAllTemplates,getTemplates, updateTemplate, currentUser}) {
  
  useEffect(() => {
    if (currentUser.firstName==='Admin')
      getAllTemplates()
    else 
      getTemplates()

  }, [])

  const update = obj => {
    updateTemplate(obj)
  }

  const [nav, setNav] = useState('dashboard')
  return (
    <div className="dashboard">
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '15px' }}>
        <SideNav nav={nav} setNav={setNav} templates={templates} />
        <Main nav={nav} templates={templates} update={update} />
      </div>
    </div>
  )
}

function Main(props) {
  const { nav, templates, update } = props
  return (
    <div className="main inner-template">
      {nav === 'pending' && <Pending templates={templates} update={update} />}
      {nav === 'customers' && <Customers />}
      {nav === 'dashboard' && <DashBoard />}
    </div>
  )
}

function SideNav(props) {
  const { nav, setNav, templates } = props
  return (
    <div className={'sideNav'}>
      <ul>
        <li>
          <button role="button" className={nav === 'dashboard' ? 'active' : ''} onClick={() => setNav('dashboard')}>
            <SVG src={customersIcon} />
            <span>Dashboard</span>
            {indicators.dashboard !== 0 && <span className={'indicator'}>{indicators.dashboard}</span>}
          </button>
        </li>
        <li>
          <button role="button" className={nav === 'pending' ? 'active' : ''} onClick={() => setNav('pending')}>
            <SVG src={dashboardIcon} />
            <span>Pending Posts</span>
            {templates.filter(template => template.public === null).length !== 0 && (
              <span className={'indicator'}>{templates.filter(template => template.public === null).length}</span>
            )}
          </button>
        </li>
        <li>
          <button role="button" className={nav === 'customers' ? 'active' : ''} onClick={() => setNav('customers')}>
            <SVG src={reportsIcon} />
            <span>Customers</span>
            {indicators.customers !== 0 && <span className={'indicator'}>{indicators.customers}</span>}
          </button>
        </li>
      </ul>
    </div>
  )
}

const indicators = { dashboard: 0, pending: 17, customers: 0 }

export default connect(
  state => {
    return {
      currentUser: state.entities.users[state.session.id],
      templates: Object.values(state.entities.templates)
    }
  },
  dispatch => ({
    getAllTemplates: () => {
      dispatch(requestTemplates('?isTemplate=true&isAllClients=true', true))
    },
    getTemplates: () => {
      dispatch(requestTemplates('?isTemplate=true', true))
    },
    updateTemplate: template => {
      dispatch(updateDesign(template))
    }
  })
)(Index)
