
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Breweries.css';
//import noimage from '../img/No-image-available.png';

class Breweries extends Component {

  constructor(props) {
    super(props);
    this.state = {
        image: [],
        loading: true
    };
  }

  loadImage = () => {
    if (this.props.brewery.imagecount !== '0') {
      let url = `http://localhost:4000/images/${this.props.brewery.id}`;
      //let url = `http://beermapping.com/webservice/locimage/44c1c9de648649cf07af9575ce783279/${this.props.brewery.id}&s=json`;
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(json => this.setState((prevState) => {
          console.log(json);
          return {
            image: json[0],
            loading: false
          };
        }))
        .catch((error) => {
          this.setState((prevState) => {
            return {
              loading: false,
              error: 'Error retrieving image'
            };
          })
        });
    }
  }

  componentDidMount() {
    this.loadImage();
  }

  render() {

    const {
      id,
      name,
      imagecount      
    } = this.props.brewery;

    const linkTo = "/breweries/" + id;

    return (
      <div className="Breweries" >
        <div className="Breweries-image-container" >
          <img src={imagecount !== '0' ? this.state.image : null} alt="" />
        </div>
        <Link to={linkTo}>{name}</Link>
      </div>
    );
  }
}

Breweries.propTypes = {
  brewery: PropTypes.instanceOf(Object).isRequired,
};

export default Breweries;
