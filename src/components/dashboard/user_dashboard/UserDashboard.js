import React, { useState } from 'react'

import { Grid } from '@material-ui/core'

import DashboardHeader from './DashboardHeader'
import DashboardActions from './DashboardActions'
import DashboardStats from './DashboardStats'
import DashboardChart from './DashboardChart'
import OrderTable from './OrderTable'
import Templates from './Templates'

const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const chart1Data = {
  labels,
  datasets: [
    {
      label: 'income',
      backgroundColor: 'rgb(93,255,211)',
      data: [30, 20, 10, 10, 15, 10, 8]
    }
  ]
}

const chart2Data = {
  labels,
  datasets: [
    {
      label: 'following',
      backgroundColor: 'rgb(1,17,28)',
      data: [30, 20, 10, 10, 15, 10, 8]
    },
    {
      label: 'followers',
      value: 200,
      backgroundColor: 'rgb(30,117,255)',
      data: [10, 20, 5, 10, 5, 8, 2]
    }
  ]
}

const stats = [
  { name: 'Profile Viewed', value: '94' },
  { name: 'Net Income', value: '1025$' },
  { name: 'Withdrawn', value: '562$' },
  { name: 'Used For Purchase', value: '500$' },
  { name: 'Pending Clearence', value: '322$' },
  { name: 'Available For Withdrawl', value: '705$' }
]

function UserDashboard(props) {
  const [view, setView] = useState('dashboard')
  return (
    <>
      <DashboardHeader />
      <DashboardActions view={view} setView={setView} />
      {view === 'dashboard' ? (
        <>
          <DashboardStats stats={stats} />
          <Grid container className="graphModule">
            <Grid item xs={12} md={6}>
              <div className="graphBlock">
                <DashboardChart data={chart1Data} type="bar" title="Your net income" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="graphBlock">
                <DashboardChart data={chart2Data} type="bar" title="Your network summary" />
              </div>
            </Grid>
          </Grid>
          <OrderTable />
        </>
      ) : (
        <Templates />
      )}
    </>
  )
}

export default UserDashboard
