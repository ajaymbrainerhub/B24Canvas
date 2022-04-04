import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Typography,
  Grid,
  Button
} from '@material-ui/core'
import React, { useState } from 'react'

const socialMediaOptions = [
  { name: 'Facebook', backgroundColor: '#E3ECFF' },
  { name: 'Instagram', backgroundColor: '#FFFAEB' },
  { name: 'Twitter', backgroundColor: '#D3F1FF' },
  { name: 'LinkedIn', backgroundColor: '#FFFAEB' },
  { name: 'Pinterest', backgroundColor: '#FFE5E3' },
  { name: 'Tumbler', backgroundColor: '#D6D6D6' },
  { name: 'Website', backgroundColor: '#959595' },
  { name: 'Link', backgroundColor: '#E8E8E8' }
]

function ShareDesignPopup({ isOpen, closeCallback }) {
  const [activeTab, setActiveTab] = useState(0)
  const [email, setEmail] = useState('')

  const handleTabChanged = (event, value) => {
    setActiveTab(value)
  }

  const generateContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="firstshareTab">
            <TextField value={email} onChange={e => setEmail(e.target.value)} placeholder="Type email here..." />
            <Grid container justifyContent="space-between" alignItems="center" className="sharePeople">
              <Grid item className="sharePeople__Info">
                <Avatar src="" className="sharePeople__Image" />
                <Typography>Daison jason</Typography>
              </Grid>
              <Grid item className="sharePeopleOwner">
                Owner
              </Grid>
            </Grid>
            <Button onClick={closeCallback} className="gray-btn">
              Back
            </Button>
          </div>
        )
      case 1:
        return (
          <div className="socialAppBlock">
            {socialMediaOptions.map(option => (
              <div className="socialApp">
                <div
                  style={{
                    backgroundColor: option.backgroundColor,
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%'
                  }}
                ></div>
                <Typography className="socialApp__name">{option.name}</Typography>{' '}
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeCallback}>
      <div className="sharePopup">
        <DialogTitle className="sharePopup__Head">
          <Typography className="sharePopup__Title">Share your design</Typography>
        </DialogTitle>
        <DialogContent className="sharePopup__tabs">
          <Tabs value={activeTab} onChange={handleTabChanged}>
            <Tab label="Email & Link" />
            <Tab label="Social Media" />
          </Tabs>
          <div className="sharePopup__tabContent">{generateContent()}</div>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default ShareDesignPopup
