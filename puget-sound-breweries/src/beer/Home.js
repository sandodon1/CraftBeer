import React, { Component } from 'react';
import Breweries from './Breweries';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breweries: [],
            currentPage: 1,
            loading: true
        };
    }

    loadBreweries = () => {
        let url = `http://localhost:4000`;
//        let url = `http://beermapping.com/webservice/locstate/44c1c9de648649cf07af9575ce783279/wa&s=json`;
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState((prevState) => {
                return {
                    breweries: json.breweries,
                    loading: false
                };
            }))
            .catch((error) => {
                this.setState((prevState) => {
                    return {
                        loading: false,
                        error: 'Error retrieving breweries'
                    };
                })
            });
    }
    
    componentDidMount() {
        this.loadBreweries();
    }

    nextPage = () => {
        this.setState((prevState) => {
          return { currentPage: prevState.currentPage + 1 };
        }, this.loadBreweries);
    }
    
    previousPage = () => {
        this.setState((prevState) => {
          return { currentPage: prevState.currentPage - 1 };
        }, this.loadBreweries);
    }
    
    render() {

        const breweriesPerPage = 10;
        const currentPage = this.state.currentPage;
        const breweryPage = this.state.breweries.slice(
                                breweriesPerPage*(currentPage-1),
                                breweriesPerPage*currentPage);

        return (
            <div className="Home">
                {this.state.loading ? <h1>Loading...</h1> : null}
                {this.state.error ? <p>{this.state.error}</p> : null}
                <div className="Home-flex-container" >
                    {breweryPage.map((brewery, index) => {
                        return <Breweries key={index} brewery={brewery} breweryId={currentPage+index+1} />;
                    })}
                </div>
                <div className="Home-page-link-container">
                    <div className="Home-page-link">
                        <button onClick={currentPage > 1 ? this.previousPage : null}
                                className={currentPage > 1 ? 'Home-Gold-button' : 'Home-Gray-button'}>Previous</button>
                    </div>
                    <div className="Home-page-link">
                         <button onClick={currentPage < this.state.breweries.length ? this.nextPage : null}
                                className={currentPage < this.state.breweries.length ? 'Home-Gold-button' : 'Home-Gray-button'}>Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
