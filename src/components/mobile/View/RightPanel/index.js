import React from 'react'
import LayerEditor from '../../../editor/LayerEditor'
import styles from './RightPanel.module.css'
import DesignToolsContainer from '../../../editor/design_tools_container'

export default function RightPanel(props) {
  const { setSelected, updateElement, setSelection, selection, layersActive, elements, selected, updateElementPos } =
    props
  const isOpen = Boolean(layersActive || selection)

  return (
    <div
      className={styles.rightPanel}
      style={isOpen ? { transform: 'translate(0)' } : { transform: 'translate(100%)', minWidth: 0, width: 0 }}
    >
      {selection && (
        <DesignToolsContainer
          elements={elements}
          selected={selected}
          updateElement={updateElement}
          setSelected={setSelected}
          selection={selection}
          setSelection={setSelection}
        />
      )}
      <LayerEditor
        isActive={true}
        setSelected={setSelected}
        updateElement={updateElement}
        setSelection={setSelection}
        selection={selection}
        elements={elements}
        updateElementPos={updateElementPos}
      />
    </div>
  )
}
