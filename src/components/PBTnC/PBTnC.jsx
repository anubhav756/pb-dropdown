import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PBTnC extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked   : props.defaultChecked,
            error     : false,
            errorMsg  : '',
            showError : true,
        };

        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
    }
    componentWillMount() {
        const { defaultChecked } = this.props;

        if (!defaultChecked) {
            this.setState({ showError: false });
        }

        this.validate(() => {
            const { onUpdate } = this.props;
            const { checked, error } = this.state;

            if (onUpdate) {
                onUpdate(checked, error);
            }
        });
    }
    componentDidUpdate({ isSubmitted: prevIsSubmitted }) {
        const { isSubmitted } = this.props;

        if (isSubmitted && !prevIsSubmitted) {
            this.setState({ showError: true });
        }
    }
    validate(callback) {
        const { required } = this.props;
        const { checked } = this.state;

        if (required && !checked) {
            this.setState({
                error    : true,
                errorMsg : 'This field is required',
            }, callback);
        } else {
            this.setState({
                error    : false,
                errorMsg : '',
            }, callback);
        }
    }
    onChange(e) {
        this.setState({
            checked: e.target.checked,
            showError: true
        }, () => this.validate(() => {
            const { onUpdate } = this.props;
            const { checked, error } = this.state;

            if (onUpdate) {
                onUpdate(checked, error);
            }
        }));
    }
    render() {
        const {
            name,
            label,
        } = this.props;
        const {
            checked,
            error,
            errorMsg,
            showError,
        } = this.state;

        return (
            <div>
                <input
                    id={`pb-tnc-input-${name}`}
                    type="checkbox"
                    checked={checked}
                    onChange={this.onChange}
                />
                <label htmlFor={`pb-tnc-input-${name}`}>{label}</label>
                {error && errorMsg && showError &&
                    <div style={{ color: 'red' }}>
                        {errorMsg}
                    </div>
                }
            </div>
        );
    }
}

PBTnC.propTypes = {
    onUpdate       : PropTypes.func.isRequired,
    isSubmitted    : PropTypes.bool.isRequired,
    defaultChecked : PropTypes.bool,
    required       : PropTypes.bool,
    name           : PropTypes.string.isRequired,
    label          : PropTypes.string.isRequired,
};

PBTnC.defaultProps = {
    defaultChecked : false,
    required       : false,
}

export default PBTnC;
