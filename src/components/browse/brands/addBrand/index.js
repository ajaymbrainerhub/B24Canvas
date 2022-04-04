import * as React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import styles from './addBrand.module.css'
import { useState, useRef } from 'react'
import { NoImage } from '../../../../assets/svg'
import SVG from 'react-inlinesvg'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import ColorPic from './ColorPic'
import { FileDrop } from 'react-file-drop'
import { connect } from 'react-redux'
import { createBrand } from '../../../../actions/brands_actions'
import FontDemo from './FontDemo'
import FontPicker from './FontPicker'

function AddBrand(props) {
  const { setOpenedProps, userId } = props
  console.log(`USER: ${userId}`)
  const [data, setData] = useState({
    name: '',
    logo: { img: '', imgSrc: '' },
    color: '#000000',
    recentColors: ['red', 'green', 'blue'],

    header: {
      family: 'Proxima Nova',
      fontSize: 25,
      fontWeight: 400,
      textTransform: 'none',
      fontStyle: 'normal',
      textDecoration: 'none'
    },
    subheader: {
      family: 'Arial',
      fontSize: 15,
      fontWeight: 400,
      textTransform: 'none',
      fontStyle: 'normal',
      textDecoration: 'none'
    },
    body: {
      family: 'Times New Roman',
      fontSize: 10,
      fontWeight: 400,
      textTransform: 'none',
      fontStyle: 'normal',
      textDecoration: 'none'
    }
  })

  const [opened, setOpened] = useState(false)

  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleDrop = (files, event) => {
    let file = files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setData({ ...data, logo: { img: file, imgSrc: reader.result } })
    }
  }

  const setColor = color => {
    setData({ ...data, color: color })
  }

  const setFontOnElement = (element, font) => {
    setData({ ...data, [element]: font })
  }

  const fileInputRef = useRef(null)

  const onFileInputChange = event => {
    const { files } = event.target
    handleDrop(files)
  }
  const { CreateBrand } = props

  return (
    <Dialog open={true}>
      <DialogTitle>
        <p>
          <b>Add brand</b>
        </p>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <input
              style={{ backgroundColor: '#efefef', padding: '0.5rem', borderRadius: '15px', marginBottom: '10px' }}
              type="text"
              name="name"
              placeholder="Brand name"
              onChange={handleChange}
            ></input>
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderWidth: '1px',
                borderRadius: '15px',
                '.file-drop > .file-drop-target.file-drop-dragging-over-target ': {
                  backgroundColor: 'silver'
                }
              }}
            >
              <FileDrop onDrop={handleDrop}>
                <CardHeader title="Brand Logo" titleTypographyProps={{ align: 'left', sx: { fontSize: 12 } }} />
                <CardContent>
                  <div className={styles.cardsContainer}>
                    {data.logo.imgSrc ? (
                      <img
                        src={data.logo.imgSrc}
                        style={{
                          borderRadius: '15px',
                          width: '50px',
                          height: '50px'
                        }}
                      />
                    ) : (
                      <SVG src={NoImage} style={{ width: '50px', height: '50px', borderRadius: '15px' }} />
                    )}

                    <button className={styles.btn} role="button" onClick={() => fileInputRef.current.click()}>
                      Add logo
                    </button>
                    <input
                      style={{ display: 'none' }}
                      onChange={onFileInputChange}
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </CardContent>
              </FileDrop>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderWidth: '1px',
                borderRadius: '15px'
              }}
            >
              <CardHeader title="Brand Colors" titleTypographyProps={{ align: 'left', sx: { fontSize: 12 } }} />
              <CardContent>
                <div className={styles.cardsContainer}>
                  <div
                    style={{ borderRadius: '15px', width: '50px', height: '50px', backgroundColor: data.color }}
                  ></div>

                  <button className={styles.btn} role="button" onClick={() => setOpened(state => !state)}>
                    Add brand color
                  </button>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderWidth: '1px',
                borderRadius: '15px'
              }}
            >
              <CardHeader title="Fonts" titleTypographyProps={{ align: 'left', sx: { fontSize: 12 } }} />

              <CardContent>
                <FontDemo title="Header" type="header" action={setFontOnElement} font={data.header} />

                <FontDemo title="SubHeader" type="subheader" action={setFontOnElement} font={data.subheader} />

                <FontDemo title="Body" type="body" action={setFontOnElement} font={data.body} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.cardsContainer}>
              <button className={styles.btnCancel} role="button" onClick={() => setOpenedProps(false)}>
                Cancel
              </button>
              <button
                className={styles.btnCreate}
                role="button"
                onClick={() => {
                  const Data = {
                    
                    creatorId:userId,
                    name:data.name,
                    images:null, colors:null, 
                    font1:{f:'hgfhg'}, 
                    font2:{f:'hgfhg'}, 
                    font3:{f:'hgfhg'}
                  }

                  CreateBrand(Data)
                  setOpenedProps(false)
                }}
              >
                Create
              </button>
            </div>
          </Grid>
        </Grid>
        {opened ? (
          <ColorPic
            setOpened={setOpened}
            colorProp={data.color}
            setColorProp={setColor}
            recentColors={data.recentColors}
          ></ColorPic>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    ownProps,
    userId: state.session.id
  }
}

const mapDispatchToProps = dispatch => ({
  CreateBrand: brand => dispatch(createBrand(brand))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBrand)
