import React from 'react';
import NavBar from './components/navBar';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './components/login';
import principal from './pages/principal';
import Admin from './components/admin';
import './styles/spinner.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = {principal} />
          <Route exact path = "/login">
            <Login />
          </Route>
          <Route exact path = "/admin" component = {Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
