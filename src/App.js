import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import Auth from './components/Auth'
import ProductList from './components/ProductList'

import './App.scss'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!isEmpty(localStorage.getItem('loggedInUser')))
  }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return isLoggedIn ? (
                <Redirect to='/home' />
              ) : (
                <Redirect to='/login' />
              )
            }}
          />

          <ProtectedRoute
            exact
            path='/home'
            component={ProductList}
          />
          {/* <Route exact path='/home' component={ProductList} /> */}
          <Route exact path='/login' component={Auth} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isEmpty(localStorage.getItem('loggedInUser'))) {
          return <Component {...rest} {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}
