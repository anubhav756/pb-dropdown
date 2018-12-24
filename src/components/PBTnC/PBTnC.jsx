import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PBTnC extends Component {
    render() {
        const {
            name,
            label,
        } = this.props;

        return (
            <div>
                <input type="checkbox" id={`pb-tnc-input-${name}`} />
                <label htmlFor={`pb-tnc-input-${name}`}>{label}</label>
            </div>
        );
    }
}

PBTnC.propTypes = {
    name         : PropTypes.string.isRequired,
    label        : PropTypes.string.isRequired,
};

export default PBTnC;
