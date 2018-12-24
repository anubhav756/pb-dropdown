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
            showError: false,
            isOpen: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.clickListener = this.clickListener.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        const { defaultValue, onUpdate } = this.props;
        const { value, error } = this.state;

        if (defaultValue) {
            this.setState({ showError: true });
        }

        this.validate(() => onUpdate && onUpdate(value, error));
        document.addEventListener('click', this.clickListener);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.clickListener);
    }
    componentDidUpdate({ isSubmitted: prevIsSubmitted }) {
        const { isSubmitted } = this.props;

        if (isSubmitted && !prevIsSubmitted) {
            this.setState({ showError: true });
        }
    }
    clickListener(e) {
        const { name } = this.props;
        const { isOpen } = this.state;
        const currentElement = document.getElementById(`pb-autocomplete-${name}`);

        if (!currentElement.contains(e.target)) {
            if (isOpen) {
                this.onBlur();
                this.toggleDropdown(false);
            }
        } else {
            this.toggleDropdown(true);
        }
    }
    onChange(e) {
        const value = { value: -1, label: e.target.value };

        this.setState({ value }, () => this.validate());
    }
    validate(callback) {
        const { required } = this.props;
        const { value } = this.state;

        if (required && !value.label) {
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
    toggleDropdown(isOpen) {
        this.setState({ isOpen });
    }
    handleSelect(value) {
        this.toggleDropdown(false);
        this.setState({ value }, () => this.validate());
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
            isOpen,
            errorMsg,
            showError,
        } = this.state;

        return (
            <div>
                <label>{label}{required ? '*': '' }</label>
                <div
                    id={`pb-autocomplete-${name}`}
                    className="pb-autocomplete"
                >
                    <input
                        type="text"
                        className="pb-autocomplete-input"
                        name={name}
                        value={value && value.label ? value.label : ''}
                        onChange={this.onChange}
                        placeholder={placeholder}
                        autoComplete="off"
                        disabled={disabled || ''}
                    />
                    <PBAutocompleteDropdown
                        isOpen={isOpen}
                        isFetching={false}
                        options={[
                            { value: 1, label: 'Google' },
                            { value: 2, label: 'Gooo' },
                            { value: 3, label: 'Goog' },
                        ]}
                        onSelect={this.handleSelect}
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
