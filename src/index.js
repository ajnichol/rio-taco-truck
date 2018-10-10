import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import Nav from './components/nav.js';
import Home from './components/home.js';


class App extends React.Component {
  render() {
    return(
      <div>
        <Nav />
        <Home />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
