import React, { useState } from 'react'

import { login } from '../api/auth.api'

import '../styles/Auth.scss'

const Auth = ({history}) => {
  const [username, setUsername] = useState('amigo')
  const [password, setPassword] = useState('delta')

  const onLogin = (e) => {
    e.preventDefault()
    login(username, password).then((response) => {
      history.push('/home')
    }) 
  }

  return (
    <div className='Auth__div'>
      <form onSubmit={onLogin}>
        <div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
            type='text'
          />
        </div>

        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            type='password'
          />
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Auth
