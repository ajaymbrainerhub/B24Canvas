import {
  Dialog,
  Box,
  Grid,
  Typography,
  Button as MuiButton,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Slider,
  Avatar
} from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'
import { DeleteIcon } from '../../assets/svg'
import Element from './elements/Element'
import * as htmlToImage from 'html-to-image'
import React, { useState, useEffect } from 'react'
import SVG from 'react-inlinesvg'
import styles from './EditorNav.module.css'
import noAvatar from '../../assets/png/placeholders/40x40.png'
import { connect } from 'react-redux'

export default function PublishTemplateWindow(props) {
  const { handleClose, isOpen, user, design, createDesign } = props
  const [state, setState] = useState({})
  const [isTemplate, setTemplate] = useState(false)
  const [isPublic, setPublic] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [previewURL, setPreviewURL] = useState('')
  const [templateType, setTemplateType] = useState('free')
  const [price, setPrice] = useState(50)

  const options = ['Barber', 'Construction', 'Events', 'Fitness', 'Food', 'Lawyer', 'Nails', 'Real state']

  useEffect(() => {
    setTemplate(design?.isTemplate)
    setPublic(design?.isPublic)
  }, [design])

  console.log(`Selected ${selectedCategories}`)

  useEffect(() => {
    const canvasBlock = document.querySelector('#noElement')
    htmlToImage.toBlob(canvasBlock).then(async blob => {
      const previewURL = window.URL.createObjectURL(blob)
      setPreviewURL(previewURL)
    })

    return () => setPreviewURL('')
  }, [isOpen])

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function publishTepmlate() {
    const reducer = (previousValue, currentValue) => previousValue + '&' + currentValue

    console.log(selectedCategories.reduce(reducer))

    const newTemplate = {
      ...design,
      creatorId: user?.id,
      title: state.title,
      description: state.description,
      isPublic: false,
      isTemplate: true,
      category: selectedCategories.reduce(reducer)
    }

    delete newTemplate.id

    const els = [...newTemplate.elements]

    els.forEach(element => {
      if (typeof element.id === 'string') {
        delete element.id
      }
    })

    newTemplate.elementsAttributes = els
    delete newTemplate.thumbnail
    // console.log(`EMAIL???: ${JSON.stringify(newTemplate)}`)
    createDesign(newTemplate)
  }

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Box p={3} className="innerPublishModel">
        <Grid container>
          {/* <Grid item sm={6}>
              <button role="button" className="btn" style={{ marginBottom: '2rem', paddingLeft: '0' }}>
                <SVG src={DeleteIcon} />
                Delete
              </button>
            </Grid> */}
          {/* <Grid container sm={6} justifyContent="flex-end">
              <FormControlLabel
                value="template"
                control={<Checkbox checked={isTemplate} onChange={e => setTemplate(e.target.checked)} />}
                label="Template"
                labelPlacement="end"
              />
  
              <FormControlLabel
                value="public"
                control={<Checkbox checked={isPublic} onChange={e => setPublic(e.target.checked)} />}
                label="Public"
                labelPlacement="end"
              />
            </Grid> */}
          <Grid item md={5} className="publishImage">
            <img src={previewURL} />
          </Grid>
          <Grid item md={7} className="publishFormBlock">
            <Box p={2} className="publishForm">
              <Typography style={{ fontWidth: 600, fontSize: '2rem' }}>Publish as a Public Template</Typography>
              <div className={styles.avatarContainer}>
                <Avatar src={user?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user.avatar}` : noAvatar} />

                <span className={styles.name}>
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div>
                <FormControl component="fieldset" className={styles.tabsPublishBtn}>
                  <RadioGroup
                    value={templateType}
                    name="template-type"
                    onChange={e => setTemplateType(e.target.value)}
                    className={styles.tabsPublishBtnRow}
                  >
                    <FormControlLabel
                      value="free"
                      control={<Radio />}
                      label="Free"
                      className={styles.tabsPublishlabel}
                    />
                    <FormControlLabel
                      value="paid"
                      control={<Radio />}
                      label="Paid"
                      className={styles.tabsPublishlabel}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div>
                {templateType === 'paid' ? (
                  <div className={styles.pricingSlider}>
                    <Typography>Price</Typography>
                    <Slider
                      value={price}
                      onChange={(_, value) => setPrice(value)}
                      className={styles.pricingSliderBox}
                    />
                    <Typography className={styles.pricingBox}>{`${price}$`}</Typography>
                  </div>
                ) : null}
              </div>
              <div className={styles.inputContainer}>
                <input name="title" value={state.title} onChange={handleChange} placeholder="Add a title" />
                <input
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  placeholder="Tell everyone what is your template about"
                />
                <Autocomplete
                  multiple
                  id="categories"
                  options={options}
                  getOptionLabel={option => option}
                  value={selectedCategories}
                  renderInput={params => <TextField {...params} variant="standard" placeholder="Categories" />}
                  onChange={(event, newValue) => {
                    setSelectedCategories(prevState => [...newValue])
                  }}
                />
              </div>
              <div className={styles.buttonsContainer}>
                <Button variant="contained" onClick={handleClose}>
                  Back to edit
                </Button>
                <BlackButton variant="contained" onClick={() => publishTepmlate()}>
                  Publish
                </BlackButton>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

const Button = withStyles(theme => ({
  root: {
    borderRadius: '1.5rem',
    fontSize: '14px',
    textTransform: 'none',
    fontWeight: '600'
  }
}))(MuiButton)

const BlackButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000'
    }
  }
}))(Button)
