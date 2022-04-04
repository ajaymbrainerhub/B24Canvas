import { Box, Grid, RadioGroup, FormControlLabel, FormControl, Radio, Tabs, Tab } from '@mui/material'
import tiers from './priceData'
import styles from './PricingPlans.module.css'
import PlanCard from './PlanCard'
import React, { useState } from 'react'
import NavBar from '../home/NavBar'
export default function PricingPlans() {
  const [planType, setPlanType] = useState('business')
  const [planPeriod, setPlanPeriod] = useState('annual')

  const handleTabs = (name, value) => {
    setPlanType(value)
  }

  return (
    <>
      <NavBar></NavBar>

      <div className className={styles.container}>
        <div className={styles.container_inner}>
          <Box className={styles.bar} sx={{ border: 1, borderColor: 'whitesmoke', borderRadius: 3 }}>
            <Tabs
              sx={{
                borderRadius: 3,
                '& .MuiTabs-indicator': {
                  display: 'none'
                },
                '& .Mui-selected': {
                  color: 'blue',
                  backgroundColor: 'whitesmoke'
                },
                '& .MuiButtonBase-root.MuiTab-root': {
                  textTransform: 'capitalize',
                  color: 'black',
                  fontSize: '1.1vw',
                  fontWeight: 'bold'
                }
              }}
              value={planType}
              onChange={handleTabs}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="business" label="Business Owner" />
              <Tab value="designer" label="Designer / Agency" />
            </Tabs>

            <FormControl component="fieldset">
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={planPeriod}
                onChange={e => setPlanPeriod(e.target.value)}
              >
                <FormControlLabel value="annual" control={<Radio />} label={<p>Annual plan</p>} />
                <FormControlLabel value="monthly" control={<Radio />} label={<p>Monthly plan</p>} />
              </RadioGroup>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {tiers.map(tier => (
              <Grid item key={tier} xs={12} md={3}>
                <PlanCard key={tier} tier={tier}></PlanCard>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  )
}
