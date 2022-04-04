import React from 'react'
import SVG from 'react-inlinesvg'

import { RingIcon, SearchIcon2 } from '../../assets/svg'

import styles from './styles.scss'

import CustomersTable from './CustomersTable'

function Index(props) {
  return (
    <div>
      <div className="tableHeader">
        <div>
          <h1>Customers</h1>
          <span className="subtext">12:15 PM at 19th November 2020</span>
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
      <CustomersTable />
    </div>
  )
}

export default Index
