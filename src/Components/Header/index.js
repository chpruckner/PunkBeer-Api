import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchInput: ""
      };
    }
  
    render() {
        return(
          <div>
            <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
              <span className="navbar-brand">We Love Beer</span>
              <ul className="nav">
                <li className="nav-item p-2">
                  <Link className="nav-item" to="/">Home</Link>
                </li>
                <li className="nav-item p-2">
                  <Link className="nav-item" to="/favourites">Favourites</Link>
                </li>
              </ul>
            </nav>
          </div>
        )
    }
}

export default Header;