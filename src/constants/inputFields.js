export default  [
    {
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
    },
    {
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
    },
    {
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
    }
]