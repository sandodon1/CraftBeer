import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Score extends Component {

    render() {

        const {
            selection,
            service,
            atmosphere,
            food,
            reviewcount
        } = this.props.score;

        return (
            <div className="Score">
                <div><strong>Number of Reviews:</strong> {reviewcount !== '0' ? reviewcount : 'None'}</div>
                <ul>
                    <li>Selection: {selection !== '0' ? selection : 'No rating'}</li>
                    <li>Service: {service !== '0' ? service : 'No rating'}</li>
                    <li>Atmosphere: {atmosphere !== '0' ? atmosphere : 'No rating'}</li>
                    <li>Food: {food !== '0' ? food : 'No rating'}</li>
                </ul>
            </div>
        );
    }
}

Score.propTypes = {
    selection: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    atmosphere: PropTypes.string.isRequired,
    food: PropTypes.string.isRequired,
    reviewcount: PropTypes.string.isRequired
};

Score.defaultProps = {
    selection: '0',
    service: '0',
    atmosphere: '0',
    food: '0',
    reviewcount: '0'
};

export default Score;
