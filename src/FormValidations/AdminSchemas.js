import * as yup from 'yup' // importing functions from yup library

const createAdminSchema = yup.object().shape({
    userName: yup.string()
            .required('User name is required')
            .min(4, 'User name must be at least 4 characters')
            .max(20, 'User name must be less than 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'User name can only contain letters, numbers, and underscores'),

    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),

    email: yup.string().email('Invalid email')
            .min(8, 'Email must be at least 8 characters')
            .max(50, 'Email must be less than 50 characters')
            .required('Email is required'),

    mobile: yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),

    password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),

    passwordTwo: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const adminProfileInfoSchema = yup.object().shape({
    userName: yup.string()
            .required('User name is required')
            .min(4, 'User name must be at least 4 characters')
            .max(20, 'User name must be less than 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'User name can only contain letters, numbers, and underscores'),

    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),

    email: yup.string().email('Invalid email')
            .min(8, 'Email must be at least 8 characters')
            .max(50, 'Email must be less than 50 characters')
            .required('Email is required'),

    mobile: yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
})

const resetAdminPsswordSchema = yup.object().shape({
    currentPassword: yup.string()
            .required('Current Password is required'),
    newPassword: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),

    newPasswordTwo: yup.string()
            .oneOf([yup.ref('newPassword'), null], 'New Passwords must match')
})

export {createAdminSchema, adminProfileInfoSchema, resetAdminPsswordSchema}