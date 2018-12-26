import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PBAutocompleteDropdown from './PBAutocompleteDropdown';
import './PBAutocomplete.css';

const filterOptions = (value, options, filterType) =>
    options.filter(o => o.label.toLowerCase()[filterType](value.label.toLowerCase()))

class PBAutocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value      : props.defaultValue || '',
            options    : [],
            error      : false,
            errorMsg   : '',
            showError  : false,
            isOpen     : false,
            isFetching : false,
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.clickListener = this.clickListener.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        const { defaultValue } = this.props;

        if (defaultValue) {
            this.setState({ showError: true });
        }

        this.validate(() => {
            const { onUpdate } = this.props;
            const { value, error } = this.state;

            if (onUpdate) {
                onUpdate(value, error)
            }
            document.addEventListener('click', this.clickListener);
        });
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
        const { fetchOptions } = this.props;
        const { options } = this.state;
        const value = { value: -1, label: e.target.value };
        const fetchResponse = fetchOptions(e.target.value, options);

        if (fetchResponse.then) {
            this.setState({
                value,
                isFetching: true
            }, () => this.validate());
            fetchResponse.then((fetchedOptions) => {
                const { isFetching } = this.state;

                if (isFetching) {
                    this.setState({
                        isFetching : false,
                        options    : fetchedOptions,
                    });
                }
            });
        } else {
            this.setState({
                value,
                isFetching : false,
                options    : fetchResponse,
            }, () => this.validate());
        }

    }
    validate(callback) {
        const { required } = this.props;
        const { value } = this.state;

        if (required && !value.label) {
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
        this.onBlur();
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
            filterType,
        } = this.props;
        const {
            value,
            error,
            isOpen,
            options,
            errorMsg,
            showError,
            isFetching,
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
                        isFetching={isFetching}
                        options={filterOptions(value, options, filterType)}
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

PBAutocomplete.propTypes = {
    name         : PropTypes.string.isRequired,
    onUpdate     : PropTypes.func.isRequired,
    fetchOptions : PropTypes.func.isRequired,
    isSubmitted  : PropTypes.bool.isRequired,
    defaultValue : PropTypes.object,
    required     : PropTypes.bool,
    filterType   : PropTypes.oneOf(['includes', 'startsWith', 'endsWith']),
};

PBAutocomplete.defaultProps = {
    required     : false,
    defaultValue : null,
    filterType   : 'includes',
};

export default PBAutocomplete;
