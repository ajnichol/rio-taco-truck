import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      locationData: [],
      googleMapURL: "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=11&size=700x1100&maptype=roadmap&key=AIzaSyDVmjqsuARE1SElhTzhEf7FEVDWITKw3iA",
      modalInfo: {}
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

  handleCard(lat, long, truckInfo) {
    console.log(truckInfo);
    $("#initialScreen").hide();
    $("#map").show();
    let mapsLink = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + ',' + long + "&zoom=14&size=700x1100&maptype=roadmap&markers=color:red%7C" + lat + ',' + long + "&key=AIzaSyDVmjqsuARE1SElhTzhEf7FEVDWITKw3iA";
    this.setState({
      googleMapURL: mapsLink,
      modalInfo: truckInfo
    });
  }

  handleDirections(address, city, state, zip) {
    let link = "https://www.google.com/maps/place/" + address + "," + city + "," + state + " " + zip + "/";
    window.open(link);
  }

  render() {
    let locationCard = this.state.locationData.map(function(truckInfo, index) {
      return (
        <div key={truckInfo.id} onClick={() => this.handleCard(truckInfo.latitude, truckInfo.longitude, truckInfo)}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Taco Truck {truckInfo.id}</h5>
              <p className="card-text">{truckInfo.address} <br /> {truckInfo.city}, {truckInfo.state} {truckInfo.postal_code}</p>
              <p className="card-text" id="closingTime">Open today until {truckInfo.saturday_close}</p>
              <p className="card-text" id="truckPhone"><i className="fa fa-phone-square" aria-hidden="true"></i> 1-(800)-Taco-Truck</p>
              <a href="#" className="card-link" onClick={() => this.handleDirections(truckInfo.address, truckInfo.city, truckInfo.state, truckInfo.postal_code)}>Directions</a>
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
              <img id="map" src={this.state.googleMapURL} />
              <div className="row">
                <div className="col-12 pull-right">
                  <p>X</p>
                </div>
                <div className="col-12 text-center">
                  <img id="placeholderImage" src={require("../assets/placeholder.png")} />
                </div>
                <div className="col-12">
                  <h5 className="card-title">Taco Truck {this.state.modalInfo.id}</h5>
                  <p className="card-text">{this.state.modalInfo.address} <br /> {this.state.modalInfo.city}, {this.state.modalInfo.state} {this.state.modalInfo.postal_code}</p>
                </div>
                <div className="col-6">
                  <p className="card-text" id="truckPhone"><i className="fa fa-phone-square" aria-hidden="true"></i> 1-(800)-Taco-Truck</p>
                </div>
                <div className="col-6">
                  <p className="card-text" id="truckPhone"><i className="fa fa-car" aria-hidden="true"></i> Get Directions</p>
                </div>
                <div className="col-6">
                  <p>Monday</p>
                  <p>Tuesday</p>
                  <p>Wednesday</p>
                  <p>Thursday</p>
                  <p>Friday</p>
                  <p>Saturday</p>
                  <p>Sunday</p>
                </div>
                <div className="col-6">
                  <p>{this.state.modalInfo.monday_open} - {this.state.modalInfo.monday_close}</p>
                  <p>{this.state.modalInfo.tuesday_open} - {this.state.modalInfo.tuesday_close}</p>
                  <p>{this.state.modalInfo.wednesday_open} - {this.state.modalInfo.wednesday_close}</p>
                  <p>{this.state.modalInfo.thursday_open} - {this.state.modalInfo.thursday_close}</p>
                  <p>{this.state.modalInfo.friday_open} - {this.state.modalInfo.friday_close}</p>
                  <p>{this.state.modalInfo.saturday_open} - {this.state.modalInfo.saturday_close}</p>
                  <p>{this.state.modalInfo.sunday_open} - {this.state.modalInfo.sunday_close}</p>
                </div>
                <div className="col-12 text-center">
                  <a href={this.state.modalInfo.url} target="_blank" id="fullDetailsBtn">View Full Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
