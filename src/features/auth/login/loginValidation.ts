import { FormikValues } from 'formik';
import { AuthErrorType } from '../../../types/FormikErrorTypes';

export const loginValidation = (values: FormikValues) => {
    const errors: AuthErrorType = {};
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
    return errors;
};
