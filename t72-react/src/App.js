import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Menu from './Menu/Menu';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Reports from './Reports/Reports';
import Summary from './Summary/Summary';
import Header from './Header/Header';

function App() {

  //log in state
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  //log a user out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  //log a user in
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Header />
      <Menu onLogout={handleLogout} isLoggedIn={isLoggedIn}/>
      <div className="App">
        <Switch>
          <Route path="/login" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
          <Route path="/reports" element={isLoggedIn ? <Reports /> : <Login onLogin={handleLogin} />} />
          <Route path="/summary" element={isLoggedIn ? <Summary /> : <Login onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
