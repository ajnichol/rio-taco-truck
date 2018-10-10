import React from 'react';
import axios from 'axios';
import jquery from 'jquery';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      locationData: []
    }
  }

  componentDidMount() {
    axios.get(
      "https://my.api.mockaroo.com/locations.json?key=a45f1200"
    ).then(function(response) {
      console.log(response.data);
      this.setState({
        locationData: response.data
      })
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }

  render() {

    let locationCard = this.state.locationData.map(function(truckInfo, index) {
      return (
        <div key={truckInfo.id}>
          <div className="card" style={{width: 18 + 'rem'}}>
            <div className="card-body">
              <h5 className="card-title">Taco Truck {truckInfo.id}</h5>
              <p className="card-text">{truckInfo.address} <br /> {truckInfo.city}, {truckInfo.state} {truckInfo.postal_code}</p>
              <p className="card-text" id="closingTime">Open today until {truckInfo.saturday_close}</p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {locationCard}
            </div>
            <div className="col-xs-12 col-md-6">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
