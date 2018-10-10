import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      locationData: []
    }
  }

  componentDidMount() {
    $("#map").hide();
    axios.get(
      "https://my.api.mockaroo.com/locations.json?key=a45f1200"
    ).then(function(response) {
      this.setState({
        locationData: response.data
      })
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }

  handleClick(lat, long) {
    $("#initialScreen").hide();
    $("#map").show();
    console.log(lat, long);
    console.log("https://maps.googleapis.com/maps/api/staticmap?center=" + lat + ',' + long + "&zoom=13&size=700x1100&maptype=roadmap&key=AIzaSyDVmjqsuARE1SElhTzhEf7FEVDWITKw3iA");
    let mapsLink = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + ',' + long + "&zoom=13&size=700x1100&maptype=roadmap&key=AIzaSyDVmjqsuARE1SElhTzhEf7FEVDWITKw3iA";
    sessionStorage.setItem("Map", mapsLink);
    console.log(sessionStorage);
  }

  render() {

    let locationCard = this.state.locationData.map(function(truckInfo, index) {
      return (
        <div key={truckInfo.id} onClick={() => this.handleClick(truckInfo.latitude, truckInfo.longitude)}>
          <div className="card" style={{width: 18 + 'rem'}}>
            <div className="card-body">
              <h5 className="card-title">Taco Truck {truckInfo.id}</h5>
              <p className="card-text">{truckInfo.address} <br /> {truckInfo.city}, {truckInfo.state} {truckInfo.postal_code}</p>
              <p className="card-text" id="closingTime">Open today until {truckInfo.saturday_close}</p>
              <p className="card-text" id="truckPhone"><i className="fa fa-phone-square" aria-hidden="true"></i> 1-(800)-Taco-Truck</p>
              <a href="#" className="card-link">Directions</a>
              <a href="#" className="card-link">More Info</a>
            </div>
          </div>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-5" id="cardContainer">
              {locationCard}
            </div>
            <div className="col-xs-12 col-md-7">
              <div className="text-center" id="initialScreen">
                <p>Click a location card to load a map</p>
              </div>
              <img src={sessionStorage.getItem("Map")} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
