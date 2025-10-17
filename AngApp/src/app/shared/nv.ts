export const NV = {
  title: 'Login Form',
  labels: {
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    mobile: 'Mobile Number',
    email: 'Email',
    gender: 'Gender',
    hobby: 'Hobby',
    address: 'Address',
    country: 'Country',
    password: 'Password',
    confirmPassword: 'Confirm Password'
  },
  placeholders: {
    firstName: 'Enter first name',
    middleName: 'Enter middle name',
    lastName: 'Enter last name',
    mobile: 'Enter 10-digit mobile number',
    email: 'Enter email',
    address: 'Enter address',
    password: 'Enter password',
    confirmPassword: 'Re-enter password'
  },
  buttons: {
    submit: 'Login'
  },
  messages: {
    required: {
      firstName: 'First name is required.',
      middleName: 'Middle name is required.',
      lastName: 'Last name is required.',
      mobile: 'Mobile number is required.',
      email: 'Email is required.',
      gender: 'Gender is required.',
      address: 'Address is required.',
      country: 'Country is required.',
      password: 'Password is required.',
      confirmPassword: 'Confirm password is required.'
    },
    pattern: {
      mobile: 'Mobile must be 10 digits.',
      password: 'Password must include upper, lower, number and special character.'
    },
    minlength: {
      password: 'Password must be at least 8 characters.',
      confirmPassword: 'Confirm password must be at least 8 characters.'
    },
    maxlength: {
      password: 'Password must be at most 16 characters.',
      confirmPassword: 'Confirm password must be at most 16 characters.'
    },
    mismatch: 'Passwords do not match.'
  },
  hobbies: ['Reading', 'Sports', 'Music'],
  countries: ['India', 'USA', 'UK', 'Canada'],
  passwordHelp: 'Password must be 8–16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
};
