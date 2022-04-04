import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SVG from 'react-inlinesvg'
import DesignToolsContainer from '../design_tools_container'
import { DragDropIcon } from '../../../assets/svg'
import styles from './LayerEditor.module.css'

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: `0`,
  margin: `0 0 8px`,
  ...draggableStyle
})

const Layer = ({ layer }) => {
  const { elementableAttributes, elementableType, transparency, zIndex, id } = layer

  const getLayerContent = () => {
    switch (elementableType) {
      case 'Text':
        return elementableAttributes.text
      case 'Shape':
        return elementableAttributes.shape
      case 'Image':
        return (
          <div className={styles.layerImage}>
            <img src={elementableAttributes.url} alt="" />
          </div>
        )
      default:
        return
    }
  }

  return (
    <div className={styles.layerItemContainer}>
      <SVG src={DragDropIcon} />
      <div className={styles.layerItem}>
        <div className={styles.layerType}>{elementableType}:</div>
        <div className={styles.layerContent}>{getLayerContent()}</div>
        <div className={styles.layerOrder}>Order: {zIndex}</div>
      </div>
    </div>
  )
}

const LayerEditor = props => {
  const { isActive, elements, updateElementPos, selected, updateElement, setSelected, selection, setSelection } = props
  const [activeElements, setActiveElements] = useState([])

  const onDragEnd = result => {
    let updatedElements = [...activeElements]
    updatedElements[result.source.index].zIndex = result.destination.index
    updatedElements[result.destination.index].zIndex = result.source.index

    updatedElements.forEach(item => updateElementPos(item))
  }

  useEffect(() => {
    const filteredElements = elements
      .filter(item => item._destroy !== true)
      .sort((a, b) => (a.zIndex > b.zIndex ? 1 : b.zIndex > a.zIndex ? -1 : 0))
    setActiveElements([...filteredElements])
  }, [elements])

  return (
    <div className={styles.layerPanel}>
      <div className={styles.panelHead}>Layers editor</div>
      <DragDropContext className={styles.elementsContainer} onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {activeElements.length > 0 &&
                activeElements.map((layer, index) => (
                  <Draggable draggableId={`${index}`} key={index} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div {...provided.dragHandleProps}>
                          <Layer key={`Layer_${index}`} layer={layer} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default LayerEditor
