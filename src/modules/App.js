// import react
import React from 'react';

// import local
import Header from './header/Header'
import { Main } from './main/Main'
import { Footer } from './footer/Footer'

import UserErrors from './common/error/UserErrors'

import './app.scss'

const App = (props) => {
  const { errors } = props;

  return (
    <div>
      {errors && errors.error && <UserErrors />}
      <Header />
      <Main />
      <Footer />
    </div>

  )
}
export default App;