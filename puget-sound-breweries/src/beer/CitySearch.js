import React, { Component } from 'react';

class CitySearch extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          city: 'Enter a city'
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({city: event.target.value});
    }
  
    handleSubmit(event) {
      //alert('A city was submitted: ' + this.state.city);
      console.log(this.state.city);
      this.props.updateBreweries(this.state.city);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Search by city: 
            <input type="text" value={this.state.city} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export default CitySearch;