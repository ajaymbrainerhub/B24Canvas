import React from 'react'
import { Link } from 'react-router-dom'
import * as htmlToImage from 'html-to-image'
import connectorNodeV1 from '@sava.team/react-filemanager-connector-node-v1'
import { FiSave, FiRefreshCw, FiDownload } from 'react-icons/fi'
import { SwipeableDrawer, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import RightPanel from './RightPanel'

//import stylesEditor from './Editor.module.css'
import SVG from 'react-inlinesvg'

import DesignContainer from './design_container'
import DesignDrawer from './DesignDrawer'
import ToolsNav from './ToolsNav'

import stylesMain from './styles.scss'
import styles from './styles.scss'

import { Ellipsis, Home, Resize, Solid, Download, Plus, Pages } from './svg'

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `${process.env.REACT_APP_FILE_MANAGER_API_URL}/${process.env.REACT_APP_BOT_ID}`
}

class MobileEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      design: {},
      elements: [],
      zoom: 0.5,
      selection: null,
      selected: {},
      loading: false,
      canvasBlock: null,
      file: null,
      drawer: 1,
      closed: true,
      editClosed: true,
      animate: true,
      layersPanelOpen: false
    }
    this.changeZoomFactor = this.changeZoomFactor.bind(this)
    this.updateDesign = this.updateDesign.bind(this)
    this.downloadDesign = this.downloadDesign.bind(this)
    this.setSelected = this.setSelected.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.updateElement = this.updateElement.bind(this)
    this.updateElementPos = this.updateElementPos.bind(this)
    this.addElement = this.addElement.bind(this)
    this.changeDrawer = this.changeDrawer.bind(this)
    this.toggleLayerPanel = this.toggleLayerPanel.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.openDrawer = this.openDrawer.bind(this)
    this.openEditPanel = this.openEditPanel.bind(this)
    this.closeEditPanel = this.closeEditPanel.bind(this)
  }

  componentDidMount() {
    const { requestDesign } = this.props
    requestDesign().then(() => {
      const { design, elements } = this.props
      this.setState({ design, elements })
      this.updateDesign()
    })
  }

  setSelection(idx) {
    this.setState({ selection: idx })
  }

  setSelected(id) {
    const { elements } = this.props
    if (id === null) {
      this.setState({ selected: {} })
    } else {
      this.setState({ selected: { [id]: elements[id] } })
    }
  }

  changeZoomFactor(fact) {
    this.setState({ zoom: fact })
  }

  updateElement(idx, element) {
    const { receiveElement } = this.props
    receiveElement(element)
  }

  updateElementPos(element) {
    const { receiveElement } = this.props
    receiveElement(element)
  }

  addElement(element) {
    const { createElement, design } = this.props
    createElement(design.id, { ...element, id: `temp-${Date.now()}` })
  }

  changeDrawer(id) {
    const { closed } = this.state
    if (closed) {
      this.setState({ drawer: id, closed: false, animate: false })
    } else {
      this.setState({ drawer: id, closed: false, animate: true })
    }
  }

  downloadDesign() {
    const canvasBlock = document.querySelector('#noElement')

    // TODO: думаю есть способ проще, пока на быструю руку
    htmlToImage.toBlob(canvasBlock).then(async blob => {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = window.URL.createObjectURL(blob)
      a.download = `${Date.now()}.png`
      a.click()

      window.URL.revokeObjectURL(a.href)
    })
  }

  openDrawer() {
    this.setState({ closed: false })
  }

  closeDrawer() {
    this.setState({ closed: true })
  }

  openEditPanel() {
    this.setState({ editClosed: false })
  }

  closeEditPanel() {
    this.setState({ editClosed: true })
  }

  saveDesign() {
    this.updateDesign()
  }

  updateDesign(isTemplate = false, isPublic = false, category = '') {
    const { updateDesign, elements, currentUser } = this.props
    const { design } = this.state

    this.setState({ loading: true })

    elements.forEach(element => {
      if (typeof element.id === 'string') {
        delete element.id
      }
    })

    design.isTemplate = !!isTemplate
    design.isPublic = !!isPublic
    design.category = category || ''
    design.elementsAttributes = elements
    delete design.thumbnail

    // TODO: вывести ошибку
    const canvasBlock = document.querySelector('#noElement')
    updateDesign(design).then(() => {
      htmlToImage.toBlob(canvasBlock).then(async blob => {
        const folderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${currentUser?.email}/Canvas/All designs`)
        const fileId = await connectorNodeV1.api.getIdForPath(
          apiOptions,
          `/${currentUser?.email}/Canvas/All designs/${design.id}.png`
        )

        if (fileId) {
          await connectorNodeV1.api.removeResources(apiOptions, [{ id: fileId }])
        }

        await connectorNodeV1.api.uploadFileToId({
          apiOptions,
          parentId: folderId,
          file: {
            type: 'image/png',
            name: `${design.id}.png`,
            file: blob
          },
          onProgress: () => {}
        })

        this.setState({ loading: false })
      })
    })
  }

  toggleLayerPanel() {
    this.setState({ layersPanelOpen: !this.state.layersPanelOpen })
  }

  render() {
    const { design, zoom, selected, loading, selection, drawer, closed, animate, layersPanelOpen, editClosed } =
      this.state
    const { elements } = this.props

    //const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <div className={'view'}>
        <header>
          <div className="left">
            <Link to={'/'}>
              <SVG src={Home} />
            </Link>
          </div>
          <div className="right">
            <button role={'button'}>
              <SVG src={Ellipsis} />
            </button>
            <button role={'button'}>
              <SVG src={Resize} />
            </button>
            <button role={'button'} onClick={this.downloadDesign}>
              <SVG src={Download} />
            </button>
            <button
              onClick={() => updateDesign(this.state.design.isTemplate, this.state.design.isPublic, category)}
              disabled={loading}
              role={'button'}
            >
              {loading ? <FiRefreshCw className="spin" /> : <SVG src={Solid} />}
            </button>
          </div>
        </header>
        <Drawer
          anchor="bottom"
          open={!closed}
          closeDrawer={this.closeDrawer}
          onClose={this.closeDrawer}
          onOpen={this.openDrawer}
          PaperProps={{
            sx: {
              background: 'transparent'
            }
          }}
          sx={{
            zIndex: 4000
          }}
        >
          <StyledBox
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible'
            }}
          >
            <Puller />
          </StyledBox>
          <ToolsNav
            closeDrawer={this.closeDrawer}
            changeDrawer={this.changeDrawer}
            current={drawer}
            closed={false}
            animate={animate}
          />
          <DesignDrawer
            addElement={this.addElement}
            zoom={zoom}
            drawer={drawer}
            closed={false}
            animate={animate}
            closeDrawer={this.closeDrawer}
            design={design}
          />
        </Drawer>
        <Drawer
          anchor="bottom"
          open={!editClosed}
          closeDrawer={this.closeEditPanel}
          onClose={this.closeEditPanel}
          onOpen={this.openEditPanel}
          hideBackdrop
          PaperProps={{
            sx: {
              background: 'transparent'
            }
          }}
          sx={{
            zIndex: 4000
          }}
        >
          <StyledBox
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible'
            }}
          >
            <Puller />
          </StyledBox>
          <RightPanel
            setSelected={this.setSelected}
            updateElement={this.updateElement}
            setSelection={this.setSelection}
            selection={selection}
            layersActive={layersPanelOpen}
            elements={elements}
            updateElementPos={this.updateElementPos}
          />
        </Drawer>
        <DesignContainer
          elements={elements}
          design={design}
          zoom={zoom}
          updateElement={this.updateElement}
          setSelection={this.setSelection}
          selection={selection}
          selected={selected}
          setSelected={this.setSelected}
        />
        <button role="button" className={'addButton'} onClick={this.openDrawer}>
          <SVG src={Plus} /> Add
        </button>
        <button role="button" className={'layersButton'} onClick={this.openEditPanel}>
          <SVG src={Pages} />
        </button>
      </div>
    )
  }
}

const StyledBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #330366, #B90040)',
  padding: '12px'
}))

const Drawer = styled(SwipeableDrawer)(({ theme }) => ({
  background: 'transparent'
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}))

export default MobileEditor
