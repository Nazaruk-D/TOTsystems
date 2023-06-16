import { FormikValues } from 'formik';
import { AuthErrorType } from '../../../types/FormikErrorTypes';

export const registerValidation = (values: FormikValues) => {
    const errors: AuthErrorType = {};
    if (!values.user_name) {
        errors.user_name = `Name is required`;
    } else if (values.user_name.length < 2) {
        errors.user_name = `Name must be min 2 characters long`;
    } else if (values.user_name.length > 20) {
        errors.user_name = `Name must not be more than 30 characters`;
    }

    if (!values.email) {
        errors.email = `Email is required`;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = `Invalid email address`;
    }

    if (!values.password) {
        errors.password = `Password is required`;
    } else if (values.password.length < 6) {
        errors.password = `Must be 6 characters or more`;
    } else if (values.password.length > 30) {
        errors.password = `Password must not be more than 30 characters`;
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = `Password is required`;
    } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = `Must be 6 characters or more`;
    } else if (values.password.length > 30) {
        errors.confirmPassword = `Password must not be more than 30 characters`;
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = `Passwords do not match`;
    }
    return errors;
};
