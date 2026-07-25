import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordRepeat,
} from '../utils/user_validation';
import { registerUserWithPassword, ApiError } from '../api/users';

export type FormField = 'email' | 'username' | 'password' | 'passwordRepeat';

export interface RegisterFormWithPasswordData {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

export function useRegisterFormWithPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormWithPasswordData>({
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateField = (field: FormField, value: string): string => {
    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'username':
        return validateUsername(value);
      case 'password':
        return validatePassword(value);
      case 'passwordRepeat':
        return validatePasswordRepeat(formData.password, value);
    }
  };

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }

    // Re-validate passwordRepeat when password changes
    if (field === 'password' && touched.passwordRepeat) {
      setErrors((prev) => ({
        ...prev,
        passwordRepeat: validatePasswordRepeat(value, formData.passwordRepeat),
      }));
    }

    // UX Improvement: Clear server error when user starts typing
    if (serverError) {
      setServerError(null);
    }

    // UX Improvement: Clear the specific field error when user corrects it
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    setTouched({
      email: true,
      username: true,
      password: true,
      passwordRepeat: true,
    });

    const newErrors = {
      email: validateEmail(formData.email),
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      passwordRepeat: validatePasswordRepeat(
        formData.password,
        formData.passwordRepeat
      ),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).every((error) => error === '')) return;

    setSubmitting(true);
    try {
      const response = await registerUserWithPassword(formData);
      console.log('Registration successful:', response);

      navigate('/activate', { 
        state: { 
          email: formData.email,
          successMessage: 'Registration successful! Please check your email for the activation link.'
        } 
      });

    } catch (err) {
      if (err instanceof ApiError) {
        // If the backend returned specific field errors, map them to the form
        if (Object.keys(err.fieldErrors).length > 0) {
          setErrors((prev) => ({
            ...prev,
            ...err.fieldErrors,
          }));

          // Mark the fields with errors as "touched" so the UI displays them immediately
          const touchedFields = Object.keys(err.fieldErrors).reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {} as Record<string, boolean>);

          setTouched((prev) => ({
            ...prev,
            ...touchedFields,
          }));
        } else {
          setServerError(err.message);
        }
      } else {
        setServerError('Network error. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    touched,
    submitting,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
