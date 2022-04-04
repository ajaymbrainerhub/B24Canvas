import React from 'react'
import * as htmlToImage from 'html-to-image'
import connectorNodeV1 from '@sava.team/react-filemanager-connector-node-v1'

import EditorNav from './EditorNav'
import DesignDrawer from './DesignDrawer'
import WorkArea from './WorkArea'
import ToolsNav from './ToolsNav'
// import LayerEditor from './LayerEditor'
import RightPanel from './RightPanel'

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `${process.env.REACT_APP_FILE_MANAGER_API_URL}/${process.env.REACT_APP_BOT_ID}`
}

import styles from './Editor.module.css'
import ShareDesignPopup from './ShareDesignPopup'

class Editor extends React.Component {
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
      closed: false,
      animate: true,
      layersPanelOpen: false,
      shareDesignModalOpen: false
    }
    this.changeZoomFactor = this.changeZoomFactor.bind(this)
    this.updateDesign = this.updateDesign.bind(this)
    this.createDesign = this.createDesign.bind(this)
    this.downloadDesign = this.downloadDesign.bind(this)
    this.setSelected = this.setSelected.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.updateElement = this.updateElement.bind(this)
    this.updateElementPos = this.updateElementPos.bind(this)
    this.addElement = this.addElement.bind(this)
    this.changeDrawer = this.changeDrawer.bind(this)
    this.toggleLayerPanel = this.toggleLayerPanel.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.toggleShareDesignModal = this.toggleShareDesignModal.bind(this)
  }

  componentDidMount() {
    const { requestDesign } = this.props
    requestDesign().then(() => {
      const { design, elements } = this.props
      this.setState({ design, elements })
      //this.updateDesign()
    })
  }
  componentWillUnmount() {}

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

  closeDrawer() {
    this.setState({ closed: true })
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

  createDesign(design) {
    const { createDesign, elements, currentUser } = this.props

    this.setState({ loading: true })

    const canvasBlock = document.querySelector('#noElement')

    createDesign(design).then(res => {
      htmlToImage.toBlob(canvasBlock).then(async blob => {
        const folderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${currentUser?.email}/Canvas/All designs`)
        const fileId = await connectorNodeV1.api.getIdForPath(
          apiOptions,
          `/${currentUser?.email}/Canvas/All designs/${res.payload.data.result.designs.id}.png`
        )

        if (fileId) {
          await connectorNodeV1.api.removeResources(apiOptions, [{ id: fileId }])
        }

        await connectorNodeV1.api.uploadFileToId({
          apiOptions,
          parentId: folderId,
          file: {
            type: 'image/png',
            name: `${res.payload.data.result.designs.id}.png`,
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

  toggleShareDesignModal(isOpen) {
    this.setState({ shareDesignModalOpen: isOpen })
  }

  render() {
    const { design, zoom, selected, loading, selection, drawer, closed, animate, layersPanelOpen } = this.state
    const { elements } = this.props

    return (
      <div className={styles.editorContainer}>
        <EditorNav
          updateDesign={this.updateDesign}
          createDesign={this.createDesign}
          design={design}
          downloadDesign={this.downloadDesign}
          loading={loading}
          openShareDesignModal={() => this.toggleShareDesignModal(true)}
        />
        <div className={styles.editorBottomContainer}>
          <ToolsNav changeDrawer={this.changeDrawer} current={drawer} closed={closed} animate={animate} />
          <DesignDrawer
            addElement={this.addElement}
            zoom={zoom}
            drawer={drawer}
            closed={closed}
            animate={animate}
            closeDrawer={this.closeDrawer}
            design={design}
            selection={selection}
            setSelected={this.setSelected}
          />
          <WorkArea
            design={design}
            elements={elements}
            zoom={zoom}
            updateElementPos={this.updateElementPos}
            selected={selected}
            setSelected={this.setSelected}
            updateElement={this.updateElement}
            selection={selection}
            setSelection={this.setSelection}
            changeZoom={this.changeZoomFactor}
            layersPanelOpen={layersPanelOpen}
            toggleLayerPanel={this.toggleLayerPanel}
          />
          <RightPanel
            setSelected={this.setSelected}
            updateElement={this.updateElement}
            setSelection={this.setSelection}
            selection={selection}
            layersActive={layersPanelOpen}
            elements={elements}
            updateElementPos={this.updateElementPos}
          />
        </div>
        <ShareDesignPopup
          isOpen={this.state.shareDesignModalOpen}
          closeCallback={() => this.toggleShareDesignModal(false)}
          title="Share your design "
        />
      </div>
    )
  }
}

export default Editor
