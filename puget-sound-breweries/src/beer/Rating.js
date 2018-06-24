import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRating from 'react-rating';
import goldstar from '../img/gold-star.png';
import graystar from '../img/gray-star.png';

class Rating extends Component {

    render() {

        return (
            <span>Rating: {this.props.rating !== '0' ?
                <ReactRating fractions={2} initialRating={this.props.rating}
                    placeholderSymbol={<img src={goldstar} alt=""/>} fullSymbol={<img src={goldstar} alt=""/>}
                    emptySymbol={<img src={graystar} alt=""/>}/>
                : "None"}
            </span>
        );
    }
}

Rating.propTypes = {
    stars: PropTypes.string.isRequired,
};

Rating.defaultProps = {
    stars: 0
};

export default Rating;
