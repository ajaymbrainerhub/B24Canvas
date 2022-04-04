import * as React from 'react'
import SVG from 'react-inlinesvg'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { MenuItem, ListItemText } from '@material-ui/core'
import TopBar from './TopBar'
import { Brands, PlusIcon2 } from '../../../assets/svg'
import AddBrand from './addBrand'
import { receiveBrands, deleteBrand } from '../../../actions/brands_actions'
import { DeleteIcon, RenameIcon } from '../../../assets/svg'
import ActionableTemplateCard from '../../actionable_template_card/ActionableTemplateCard'

import styles from './index.module.css'

function BrandsPage(props) {
  const [opened, setOpened] = useState(false)
  const { brands, removeBrand } = props

  useEffect(() => {
    const { requestBrands } = props
    requestBrands()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <TopBar title="Brands" />
        {brands.length === 0 ? (
          <NoBrands setOpened={setOpened} />
        ) : (
          <>
            <div className={styles.masonry}>
              {brands.map(brand => (
                <ActionableTemplateCard
                  id={brand.id}
                  image={brand.logo.imgSrc}
                  title={brand.name ? brand.name : 'Unnamed brand'}
                  subTitle={null}
                  render={menu => (
                    <>
                      <MenuItem onClick={() => removeBrand(brand)}>
                        <SVG src={RenameIcon} style={{ width: '18px', height: '18px' }} />
                        <ListItemText style={{ marginLeft: '1em' }}>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          removeBrand(brand)
                          menu()
                        }}
                      >
                        <SVG src={DeleteIcon} style={{ width: '18px', height: '18px' }} />
                        <ListItemText style={{ marginLeft: '1em' }}>Delete</ListItemText>
                      </MenuItem>
                    </>
                  )}
                />
              ))}
              <div className={styles.buttomBar}>
                <button onClick={() => setOpened(true)}>
                  <SVG src={PlusIcon2} style={{ width: '60px', height: 'auto' }} />
                </button>
              </div>
            </div>
          </>
        )}

        {opened ? <AddBrand openPopup={opened} setOpenedProps={setOpened}></AddBrand> : null}
      </div>
    </>
  )
}
function NoBrands(props) {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.empty}>
        <SVG src={Brands} />
        <h2>No brands yet...</h2>
        <span>Add your first brand</span>
        <button role="button" onClick={() => props.setOpened(true)}>
          Add brand
        </button>
      </div>
    </div>
  )
}
export default connect(
  state => {
    const brands = Object.values(state.entities.brands)
    return {
      currentUser: state.entities.users[state.session.id],
      brands: brands
    }
  },
  dispatch => ({
    requestBrands: () => dispatch(receiveBrands()),
    removeBrand: brand => dispatch(deleteBrand(brand))
  })
)(BrandsPage)
