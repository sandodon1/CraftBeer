import React, { Component } from 'react';
import './Brewery.css';
import Rating from './Rating';
import Score from './Score';
import noimage from '../img/No-image-available.png';

class Brewery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brewery: {},
            image: {},
            location: {},
            score: {},
            loading: true
        };
    }

    getId = () => {
        const url = this.props.location.pathname;
        const startIndex = url.lastIndexOf("/") + 1;
        return url.slice(startIndex, url.length).toString();
    }
    
    loadBrewery = () => {
        const id = this.getId();
        let url = `http://localhost:4000/brewery/${id}`;
        //let url = `http://beermapping.com/webservice/locquery/44c1c9de648649cf07af9575ce783279/${id}&s=json`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState((prevState) => {
                console.log(json);
                //console.log(json[0]);
                return {
                    brewery: json.brewery[0],
                    loading: false
                };
            }))
            .catch((error) => {
                this.setState((prevState) => {
                    return {
                        loading: false,
                        error: 'Error retrieving brewery'
                    };
                })
            });
    }
    
    loadImage = () => {
        const id = this.getId();
        let url = `http://localhost:4000/images/${id}`;
        //let url = `http://beermapping.com/webservice/locimage/44c1c9de648649cf07af9575ce783279/${id}&s=json`;
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState((prevState) => {
                return {
                    image: json.images[0],
                    loading: false
                };
            }))
            .catch((error) => {
                this.setState((prevState) => {
                    return {
                        loading: false,
                        error: 'Error retrieving images'
                    };
                })
            });
    }

    loadLocation = () => {
        const id = this.getId();
        let url = `http://localhost:4000/map/${id}`;
        //let url = `http://beermapping.com/webservice/locmap/44c1c9de648649cf07af9575ce783279/${id}&s=json`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState((prevState) => {
                return {
                    location: json.map[0],
                    loading: false
                };
            }))
            .catch((error) => {
                this.setState((prevState) => {
                    return {
                        loading: false,
                        error: 'Error retrieving location'
                    };
                })
            });
    }

    loadScore = () => {
        const id = this.getId();
        let url = `http://localhost:4000/score/${id}`;
        //let url = `http://beermapping.com/webservice/loccsore/44c1c9de648649cf07af9575ce783279/${id}&s=json`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState((prevState) => {
                return {
                    score: json.scores[0],
                    loading: false
                };
            }))
            .catch((error) => {
                this.setState((prevState) => {
                    return {
                        loading: false,
                        error: 'Error retrieving location'
                    };
                })
            });
    }

    componentDidMount() {
        this.loadBrewery();
        this.loadImage();
        this.loadLocation();
        this.loadScore();
    }

    render() {

         const {
            name,
            status,
            blogmap,
            street,
            city,
            state,
            zip,
            phone,
            url,
            overall,
            imagecount
        } = this.state.brewery;
     
        console.log(this.state);
        const webpageLink = "http://" + url;
        const stars = parseInt(overall, 10) / 20;
        const altMap = name + ' Map';
        console.log(blogmap);
        const oldUrl = `https://beermapping.com/?lat=${this.state.location.lat}&lon=${this.state.location.lng}&z=15`;
        const mapUrl = `http://localhost:4000/mapimage/${this.state.location.lat}/${this.state.location.lng}`;

        return (
            <div className="Brewery">
                {this.state.loading ? <h1>Loading...</h1> : null}
                {this.state.error ? <p>{this.state.error}</p> : null}
                <h2>{name}</h2>
                <div className="Brewery-flex-container">
                    <div className="Brewery-image-container">
                        <img src={imagecount > 0 ? this.state.image.imageurl : noimage} alt="" />
                    </div>
                    <div className="Brewery-stats">
                        <div><strong>Type: </strong>{status}</div>
                        <div><strong>Street Address: </strong>{street}</div>
                        <div><strong>City: </strong>{city}, {state} {zip}</div>
                        <div><strong>Phone: </strong>{phone}</div>
                        <div><strong>Web site: </strong><a href={webpageLink}>{url}</a></div>
                        <div><strong>Latitude: </strong>{this.state.location.lat}</div>
                        <div><strong>Longitude: </strong>{this.state.location.lng}</div>
                        <Rating rating={stars.toString()}/>
                        <Score score={this.state.score}/>
                        {/* <div className="Brewery-map-container">
                            <img src={oldUrl} alt={altMap}/>
                        </div> */}
                    </div>
                </div>
                <div className="Brewery-button-container">
                    <button onClick={this.props.history.goBack}
                            className="Brewery-Gold-button">Back</button>
                </div>
                {/* <div className="Brewery-map-container">
                    <embed src={oldUrl} alt={altMap}/>
                </div> */}
            </div>
        );
    }
}
  
export default Brewery;

