import React from 'react';
import $ from 'jquery';

class Nav extends React.Component {

  componentDidMount() {
    if($(window).width() < 550) {
      $("#desktopNav").hide();
      $("#mobileNav").show();
    }
    else {
      $("#desktopNav").show();
      $("#mobileNav").hide();
    }
  }

  render () {
    return (
      <div>
        <nav className="navbar navbar-expand-lg" id="desktopNav">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img id="rioSEOLogo" src={require("../assets/rio-seo-logo.png")} alt="Rio SEO Logo" />
            </a>

            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Menu</a>
                </li>
                <li className="nav-item">
                  <span className="navbar-text">
                    <i className="fa fa-map-marker" aria-hidden="true"></i> Truck Locator
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="mobileNav">
          <div className="container text-center">
            <div className="row">
              <div className="col-4">
                <a className="navbar-brand" href="#">
                  <img id="mobileMenu" src={require("../assets/menu.png")} alt="Collapsed Menu Button" />
                </a>
              </div>
              <div className="col-4">
                <a href="#">
                  <img id="mobileLogo" src={require("../assets/rioSEOMobileLogo.png")} alt="Rio SEO Mobile Logo" />
                </a>
              </div>
              <div className="col-4">
                <span className="navbar-text">
                  <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;
