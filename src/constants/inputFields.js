export default  [{
        min:4,
        max:10,
        name: "fname",
        hint:"Please enter your name as per your PAN card",
        placeholder:"Fill in your first name",
        defaultValue:"",
        label:"First Name",
        disabled:false,
        required:true,
        regex:/^[a-z]+$/i,
        component: 'PBInput',
    }, {
        min:4,
        max:10,
        name: "lname",
        hint:"Please enter your name as per your PAN card",
        placeholder:"Fill in your last name",
        defaultValue:"",
        label:"Last Name",
        disabled:false,
        required:true,
        regex:/^[a-z]+$/i,
        component: 'PBInput',
    }, {
        name: 'companyName',
        label: 'Company Name',
        required: true,
        placeholder:"Search employer's name",
        disabled: false,
        component: 'PBAutocomplete',
        fetchOptions: (keyword, options) =>
            options && options.length ?
                options :
                new Promise(resolve => setTimeout(() => resolve([
                    { value: 1, label: 'Google' },
                    { value: 2, label: 'Gooo' },
                    { value: 3, label: 'Gaaoo' },
                ]), 1000))
    }, {
        name: 'tnc',
        component: 'PBTnC',
        required: true,
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
]