import React, { useState, useEffect } from 'react'
import PendingTable from './PendingTable'
import SVG from 'react-inlinesvg'
import { RingIcon, SearchIcon2 } from '../../../assets/svg'

export default function Pending({ templates, update }) {
  return (
    <>
      <div className="tableHeader">
        <div>
          <h1>Pending Templates</h1>
          <span className="subtext">{`Today ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</span>
        </div>
        <div className="rightSide">
          <div className="search">
            <input placeholder="Search" />
            <SVG src={SearchIcon2} />
          </div>
          <select>
            <option>last 30 days</option>
            <option>last 7 days</option>
            <option>last 24 hours</option>
          </select>
          <button className="iconButton">
            <SVG src={RingIcon} />
          </button>
          <button className="iconButton"></button>
        </div>
      </div>
      <PendingTable templates={templates} update={update} />
    </>
  )
}
