import React from 'react'

const Image = ({ elementAttr: { url, transform }, zoom }) => (
  <img src={url} style={{ width: '100%', height: '100%', cursor: 'move', transform }} alt="" />
)

export default Image
