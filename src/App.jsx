import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/HomePage'
import AddMovie from './pages/AddMovie'

const App = () => {
  return (
    <Router>
      <header>
        <nav className="nav">
          <section>
            <Link to="/">Library</Link>
          </section>
          <section>
            <Link to="/addfile">Add File</Link>
          </section>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/addfile" component={AddMovie}></Route>
      </Switch>
    </Router>
  )
}

export default App
