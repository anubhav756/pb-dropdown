import React, { Component } from 'react';

class PBInput extends Component {
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
        const { defaultValue } = this.props;

        if (!defaultValue) {
            this.setState({ showError: false });
        }

        this.validate(() => {
            const { onUpdate } = this.props;
            const { value, error } = this.state;

            if (onUpdate) {
                onUpdate(value, error)
            }
        });
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
        const { label, required, regex, min } = this.props;
        const { value } = this.state;

        if (required && !value.length) {
            this.setState({
                error: true,
                errorMsg: 'This field is required',
            }, callback);
        } else if (regex && !(new RegExp(regex).test(value))) {
            this.setState({
                error: true,
                errorMsg: `Please enter correct ${label.toLowerCase()}`,
            }, callback);
        } else if (min && value.length < min) {
            this.setState({
                error: true,
                errorMsg: `Please enter minimum of ${min.toString()} chars`,
            }, callback);
        } else {
            this.setState({
                error: false,
                errorMsg: '',
            }, callback);
        }
    }
    onBlur(e) {
        const { onUpdate } = this.props;
        const { value, error } = this.state;

        this.setState({ showError: true });

        if (onUpdate) {
            onUpdate(value, error);
        }
    }
    render() {
        const {
            label,
            placeholder,
            required,
            hint,
            disabled,
            max,
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
                <input 
                    type="text" 
                    name="name" 
                    value={value} 
                    onChange={this.onChange} 
                    onBlur={this.onBlur} 
                    placeholder={placeholder}
                    autoComplete="off"
                    disabled={disabled ? disabled : ""}
                />
                <span>{value.length}/{max} remaining</span>
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

export default PBInput;
