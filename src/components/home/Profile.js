import React, { Fragment } from 'react'

import SVG from 'react-inlinesvg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import { FaCartArrowDown, FaWeightHanging } from 'react-icons/fa'

import TemplateItem from '../dashboard/user_dashboard/TemplateItem'

import { requestDesigns } from '../../actions/design_actions'

import noAvatar from '../../assets/png/placeholders/64x64.png'
import { SettingsIcon, EditIcon, HeartIcon } from '../../assets/svg'
import styles from './Profile.module.css'
import Templates from '../dashboard/user_dashboard/Templates'

const isSeller = true

class Profile extends React.Component {
  componentDidMount() {
    const { requestDesigns, currentUser } = this.props
    requestDesigns(currentUser?.email)
  }

  render() {
    const { user, designs, recentDesigns } = this.props
    const noBackground =
      'https://wallup.net/wp-content/uploads/2019/09/813312-autumn-fall-landscape-nature-tree-forest.jpg'

    return (
      <>
        <div className="scrollTemplate scrollTemplate--withoutHead">
          <div className={styles.container}>
            {/* banner section */}
            <div className={styles.userCover}>
              <ButtonGroup className={styles.userCoverInner}>
                <Button>12 Following</Button>
                <Button>78 Followers</Button>
              </ButtonGroup>
            </div>

            {/* actions section */}
            <Grid container justifyContent="space-between" className={styles.userDetails}>
              <Grid item className={styles.userDetailsPart1}>
                {isSeller ? (
                  <Button>
                    <FaCartArrowDown size={13} />
                    Seller Dashboard
                  </Button>
                ) : null}
                <Button>
                  <FaWeightHanging size={13} />
                  Purchased Templates
                </Button>
              </Grid>

              <Grid item className={styles.userDetailsBlock}>
                <Avatar
                  src={user?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user.avatar}` : noAvatar}
                  className={styles.userImg}
                />
                <Typography className={styles.userName}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography className={styles.userEmail}>{user?.email}</Typography>
              </Grid>

              <Grid item className={styles.userDetailsPart2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/user/settings" className={styles.ghostButton}>
                  <Button role="button">
                    <SVG src={SettingsIcon} size={13} /> Settings
                  </Button>
                </Link>

                <Link to="#" className={styles.ghostButton}>
                  <Button role="button">
                    <SVG src={EditIcon} size={13} />
                  </Button>
                </Link>
              </Grid>
            </Grid>

            {/* my design section */}
            {isSeller ? <Templates /> : null}

            {/* saved designs section */}
            <Grid container justifyContent="space-between" className="UserTemaplateHeader">
              <Typography className="UserTemaplateHeader__title">
                <SVG src={HeartIcon} width={11} height={11} style={{ marginRight: 4 }} /> Saved Designs
              </Typography>
              <div className="UserTemaplateHeader__btns">
                <Link to="/folder/saved">
                  <button variant="outlined">View All</button>
                </Link>
              </div>
            </Grid>
            <div className={styles.designsContainer}>
              {(designs &&
                designs.length &&
                designs.map((design, i) => (
                  <Fragment key={i}>
                    <TemplateItem
                      name={design.title}
                      category={design.category}
                      isForSale={false}
                      image={encodeURI(
                        `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${user?.email}/Canvas/All designs/${design.id}.png`
                      )}
                    />
                  </Fragment>
                ))) ||
                'No items'}
            </div>

            {/* recent viwed design section */}
            <Grid container justifyContent="space-between" className="UserTemaplateHeader">
              <Typography className="UserTemaplateHeader__title">Recent Viwed Design</Typography>
            </Grid>
            <div className={styles.designsContainer}>
              {(recentDesigns &&
                recentDesigns.length &&
                recentDesigns.map((design, i) => (
                  <Fragment key={i}>
                    <TemplateItem
                      name={design.title}
                      category={design.category}
                      isForSale={false}
                      image={encodeURI(
                        `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${user?.email}/Canvas/All designs/${design.id}.png`
                      )}
                    />
                  </Fragment>
                ))) ||
                'No items'}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connect(
  state => ({
    user: state.entities.users[state.session.id],
    designs: Object.values(state.entities.designs),
    recentDesigns: Object.values(state.entities.designs)
      .slice()
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
  }),
  dispatch => ({
    requestDesigns: () => dispatch(requestDesigns(''))
  })
)(Profile)
