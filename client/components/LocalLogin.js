import React from 'react'
import { connect } from 'react-redux'
import {login, signUp} from '../redux/auth'

const LocalLoginForm = (props) => {
  const {handleSubmit} = props
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className='flex column'>
        <div className='flex column m1'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' className='input' />
        </div>
        <div className='flex column m1'>
          <label htmlFor='email'>Password</label>
          <input type='password' name='password' className='input' />
        </div>
        <div className='m1'>
          <button type='submit' className='btn bg-blue white p1 rounded'>Login</button>
        </div>
      </div>
    </form>
    <form method='get' action='/auth/google'>
     <button type='submit' className='btn bg-red white p1 rounded'>Login with Google</button>
    </form>
    </div>
  )
}

const mapDispatch = (dispatch, ownProps) => {
    return {
      async handleSubmit (evt) {
        evt.preventDefault()
        // trigger thunk (AJAX login request)
        const thunk = await login({
          email: evt.target.email.value,
          password: evt.target.password.value
        })
        
        const success = await dispatch(thunk)
        if (success){
            ownProps.history.push('/home')
        }
        else {
            window.alert('Incorrect Email or Password')
        }
        // once that is complete, change the URL to /home
      }
    }
  }

export default connect(null, mapDispatch)(LocalLoginForm)
