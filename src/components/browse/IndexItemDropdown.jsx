import React from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiFolder, FiLink, FiEyeOff, FiEye, FiEdit, FiRotateCcw } from 'react-icons/fi'

import styles from './IndexItemDropdown.module.css'

class IndexItemDropdown extends React.Component {
  constructor(props) {
    super(props)
    const { design } = this.props
    this.state = {
      animate: false,
      title: design.title,
      move: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePublic = this.togglePublic.bind(this)
    this.toggleTrash = this.toggleTrash.bind(this)
    this.toggleMove = this.toggleMove.bind(this)
    this.deleteDesign = this.deleteDesign.bind(this)
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ animate: true })
      })
    })
  }

  componentWillUnmount() {
    this.handleSubmit()
  }

  handleChange(form) {
    return e => {
      this.setState({ [form]: e.currentTarget.value })
    }
  }

  handleSubmit() {
    const { updateDesign, design } = this.props
    const { title } = this.state
    if (design.title !== title) {
      updateDesign({ id: design.id, title })
    }
  }

  toggleMove() {
    // this.setState({ move: true })
    // const { requestFolders, currentUser } = this.props
    // requestFolders(currentUser?.email)
  }

  togglePublic() {
    const { updateDesign, design } = this.props
    updateDesign({ id: design.id, public: !design.public })
  }

  toggleTrash() {
    const { updateDesign, design } = this.props
    updateDesign({ ...design, trash: true })
  }

  deleteDesign() {
    const { deleteDesign, design, currentUser, toggleDropdown } = this.props
    deleteDesign(design.id, currentUser?.email)
    toggleDropdown({ direction: true })
  }

  changeFolder(folderId) {
    const { updateDesign, design, toggleDropdown } = this.props
    updateDesign({ id: design.id, folderId }).then(toggleDropdown())
  }

  // createDesign(item) {
  //   const { createDesign, currentUser, requestDesign, history, design, elements } = this.props;
  //   const newDesign = {
  //     creatorId: currentUser.id,
  //     title: item.name,
  //     description: item.description,
  //     public: false,
  //     width: item.width,
  //     height: item.height,
  //   };
  //   requestDesign(item.id).then(() => {
  //     debugger;
  //   });

  //   createDesign(design).then((res) => {
  //     history.push(`/design/${res.payload.design.id}`);
  //   });
  // }

  render() {
    const { animate, title, move } = this.state
    const { design, folders, currentUser, direction, deleteDesign } = this.props
    if (design.creatorId === currentUser.id) {
      return (
        <div
          className={`${styles.dropdownCard} ${animate ? styles.animate : ''}`}
          style={{ right: `${direction ? -278 : 10}px` }}
        >
          <ul className={styles.dropDown}>
            <li className={styles.title}>
              <h2>{design.title}</h2>
            </li>
            <li>
              <hr className={styles.hr} />
            </li>
            <Link to={`/design/${design.id}`}>
              <li className={styles.listItem}>
                <FiEdit className={styles.icon} />
                <span className="ml-8">Open for editing</span>
              </li>
           
            </Link>
            <li className={styles.listItem} onClick={this.toggleMove}>
            <FiFolder className={styles.icon} />
            <span className="ml-8">Move to folder</span>
          </li>
           
            <Link to={`/view/${design.id}`}>
              <li className={styles.listItem}>
                <FiLink className={styles.icon} />
                <span className="ml-8">Get shareable link</span>
              </li>
            </Link>
            {!design.isPublic && <li className={styles.listItem} onClick={this.toggleTrash}>
              <FiTrash2 className={styles.icon} />
              <span className="ml-8">Move to trash</span>
            </li>}
          </ul>
        </div>
      )
    }
    // if (move) {
    //   return (
    //     <div
    //       className={`${styles.dropdownCard} ${animate ? styles.animate : ''}`}
    //       style={{ right: `${direction ? -278 : 10}px` }}
    //     >
    //       <ul className={styles.dropDown}>
    //         <li className={styles.title}>
    //           <h2>{design.title}</h2>
    //         </li>
    //         <li>
    //           <hr className={styles.hr} />
    //         </li>
    //         {folders.map(folder => (
    //           <li className={styles.listItem} onClick={() => this.changeFolder(folder.id)}>
    //             <FiFolder className={styles.icon} />
    //             <span className="ml-8">{folder.name}</span>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )
    // }
    // if (design.trash) {
    //   return (
    //     <div
    //       className={`${styles.dropdownCard} ${animate ? styles.animate : ''}`}
    //       style={{ right: `${direction ? -278 : 10}px` }}
    //     >
    //       <ul className={styles.dropDown}>
    //         <li className={styles.title}>
    //           <h2>{design.title}</h2>
    //         </li>
    //         <li>
    //           <hr className={styles.hr} />
    //         </li>
    //         <li className={styles.listItem} onClick={this.toggleTrash}>
    //           <FiRotateCcw className={styles.icon} />
    //           <span className="ml-8">Restore</span>
    //         </li>
    //         <li className={styles.listItem} onClick={this.deleteDesign}>
    //           <FiTrash2 className={styles.icon} />
    //           <span className="ml-8">Permanently delete</span>
    //         </li>
    //       </ul>
    //     </div>
    //   )
    // }
    return (
      <div
        className={`${styles.dropdownCard} ${animate ? styles.animate : ''}`}
        style={{ right: `${direction ? -278 : 10}px` }}
      >
        <ul className={styles.dropDown}>
          <li className={styles.title}>
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={this.handleChange('title')}
              onBlur={this.handleSubmit}
            />
          </li>
          <li>
            <hr className={styles.hr} />
          </li>
          {/* <li className={styles.listItem} onClick={() => this.createDesign(design)}>
            <FiCopy className={styles.icon} />
            <span className="ml-8">Make a copy</span>
          </li> */}
          <li className={styles.listItem} onClick={this.togglePublic}>
            {design.public ? (
              <>
                <FiEyeOff className={styles.icon} />
                <span className="ml-8">Make design private</span>
              </>
            ) : (
              <>
                <FiEye className={styles.icon} />
                <span className="ml-8">Make design public</span>
              </>
            )}
          </li>
         
          <Link to={`/design/${design.id}`}>
            <li className={styles.listItem}>
              <FiEdit className={styles.icon} />
              <span className="ml-8">Create new</span>
            </li>
          </Link>
          <Link to={`/view/${design.id}`}>
            <li className={styles.listItem}>
              <FiLink className={styles.icon} />
              <span className="ml-8">Get shareable link</span>
            </li>
          </Link>
          
        </ul>
      </div>
    )
  }
}

export default IndexItemDropdown
