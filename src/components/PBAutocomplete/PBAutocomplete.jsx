import React, { Component } from 'react';
import PBAutocompleteDropdown from './PBAutocompleteDropdown';
import './PBAutocomplete.css';

class PBAutocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue || '',
            error: false,
            errorMsg: '',
            showError: true,
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.validate = this.validate.bind(this);
    }
    componentWillMount() {
        const { defaultValue, onUpdate } = this.props;
        const { value, error } = this.state;

        if (!defaultValue) {
            this.setState({ showError: false });
        }

        this.validate(() => onUpdate && onUpdate(value, error));
    }
    componentDidUpdate({ isSubmitted: prevIsSubmitted }) {
        const { isSubmitted } = this.props;

        if (isSubmitted && !prevIsSubmitted) {
            this.setState({ showError: true });
        }
    }
    onChange(e) {
        const { max } = this.props;

        if (max && e.target.value.length > max) return;

        this.setState({ value: e.target.value }, () => this.validate());
    }
    validate(callback) {
        const { required } = this.props;
        const { value } = this.state;

        if (required && !value.length) {
            this.setState({
                error: true,
                errorMsg: 'This field is required',
            }, callback);
        } else {
            this.setState({
                error: false,
                errorMsg: '',
            }, callback);
        }
    }
    onBlur() {
        const { onUpdate } = this.props;
        const { value, error } = this.state;

        this.setState({ showError: true });

        if (onUpdate) {
            onUpdate(value, error);
        }
    }
    render() {
        const {
            name,
            label,
            placeholder,
            required,
            hint,
            disabled,
        } = this.props;
        const {
            value,
            error,
            errorMsg,
            showError,
        } = this.state;

        return (
            <div>
                <label>{label}{required ? '*': '' }</label>
                <div className="pb-autocomplete">
                    <input
                        type="text"
                        className="pb-autocomplete-input"
                        name={name}
                        value={value}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        placeholder={placeholder}
                        autoComplete="off"
                        disabled={disabled || ''}
                    />
                    <PBAutocompleteDropdown
                        isOpen
                        isFetching={false}
                        options={[
                            { value: 1, label: 'Google' },
                            { value: 2, label: 'Gooo' },
                            { value: 3, label: 'Goog' },
                        ]}
                        onSelect={(...v) => console.log('--->', v)}
                    />
                </div>
                <div>{hint ? hint : ""}</div>
                {error && errorMsg && showError &&
                    <div style={{ color: 'red' }}>
                        {errorMsg}
                    </div>
                }
            </div>
        );
    }
}

export default PBAutocomplete;
