import React, { Component } from 'react';
import InputFields from './constants/inputFields';
import PBInput from './components/PBInput';
import PBAutocomplete from './components/PBAutocomplete';
import PBTnC from './components/PBTnC';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues  : {},
            formErrors  : {},
            isSubmitted : false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }
    onUpdate(key, value, error) {
        this.setState(({ formValues, formErrors }) => ({
            formValues: {
                ...formValues,
                [key]: value,
            },
            formErrors: {
                ...formErrors,
                [key]: error,
            }
        }));
    }
    onSubmit(e) {
        const { formValues, formErrors } = this.state;
        let isFormValid = true;

        e.preventDefault();

        Object.keys(formErrors).forEach(key => {
            if (formErrors[key]) {
                isFormValid = false;
            }
        });

        this.setState({ isSubmitted: true });

        if (isFormValid) {
            console.log('Submit:', formValues);
        }
    }
    render() {
        const FieldsMap = {
            PBInput,
            PBAutocomplete,
            PBTnC,
        };

        return (
            <div>
                <div>Hello World is always awesome</div>
                <br />
                <form onSubmit={this.onSubmit}>
                    {
                        InputFields.map(({ component, ...field }, i)=>{
                            const Field = FieldsMap[component]

                            return (
                                <Field 
                                    {...field}
                                    key={i}
                                    isSubmitted = {this.state.isSubmitted}
                                    onUpdate={(value, error)=>{this.onUpdate(field.name, value, error)}}
                                />
                            )
                        })
                    }
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
