import React from 'react'
import { Link } from 'react-router-dom'
import { FiUserCheck, FiChevronsLeft } from 'react-icons/fi'
import { googleIcon } from './AuthIcons'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      animate: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.demoLogin = this.demoLogin.bind(this)
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ animate: true })
      })
    })
    const { clearErrors } = this.props
    clearErrors()
  }

  handleChange(form) {
    return e => {
      this.setState({ [form]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { action } = this.props
    const { email, password } = this.state
    action({ email, password })
  }

  demoLogin() {
    const { demoLogin, history } = this.props
    demoLogin()
    history.push('/')
  }

  render() {
    const { errors } = this.props
    const { animate } = this.state
    return (
      <form className={animate ? 'animated auth-form' : 'auth-form'} onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="return-login">
            <Link to="/signup">
              <FiChevronsLeft />
            </Link>
            <h2>Log in to your account</h2>
          </div>
          {/* <button type="button" className="google btn-outline" disabled>
          {googleIcon}
          <span>Log in with Google</span>
        </button>
        <button type="button" onClick={this.demoLogin} className="demo btn-outline">
           {facebookIcon}
          <i>
            <FiUserCheck />
          </i>
          <span>Log in as Demo User</span>
        </button>
        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>*/}
          {errors.length ? <div className="error">{typeof errors === 'object' ? errors.join('. ') : errors}</div> : ''}
          <input type="text" name="email" placeholder="Email" onChange={this.handleChange('email')} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange('password')} />
          <button
            type="submit"
            className="btn-blue"
            style={{ margin: 'auto', width: '100%', marginTop: '40px', textDecoration: 'none' }}
          >
            Log in
          </button>
          <p className="auth-text">
            Don’t have an account?
            <Link className="auth-text-red" to="/signup">
              Sign up for free!
            </Link>
            <br />
            <Link className="auth-text-blue" to="/signup">
              Forgot your password?
            </Link>
          </p>
        </div>
      </form>
    )
  }
}

export default LoginForm
