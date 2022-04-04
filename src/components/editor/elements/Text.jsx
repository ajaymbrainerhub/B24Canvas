import React from 'react'
// import styles from './Text.module.css';

const Text = ({
  elementAttr: {
    color,
    fontFamily,
    fontSize,
    fontWeight,
    text,
    textTransform,
    fontStyle,
    textDecoration,
    textAlign,
    lineHeight
  },
  zoom
}) => (
  <div
    // className={styles.text}
    style={{
      color,
      fontFamily,
      fontSize: fontSize * zoom,
      fontWeight,
      textTransform,
      fontStyle,
      textDecoration,
      textAlign,
      lineHeight
    }}
  >
    {text}
  </div>
)

export default Text
