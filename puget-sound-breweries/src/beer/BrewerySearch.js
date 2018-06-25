import React, { Component } from 'react';

class BrewerySearch extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
          name: 'Enter a brewery name'
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({name: event.target.value});
    }
  
    handleSubmit(event) {
      //alert('A brewery name was submitted: ' + this.state.name);
      this.props.updateBreweries(this.state.name);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Search by brewery name: 
            <input type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export default BrewerySearch;