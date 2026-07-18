// hooks/ knows about form state

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordRepeat,
} from '../utils/user_validation';
import { registerUser, ApiError } from '../api/users';


export type FormField = 'email' | 'username' | 'password' | 'passwordRepeat';

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

export function useRegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
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
      const response = await registerUser(formData);

      console.log('Registration successful:', response);
      // TODO verification page
      navigate('/verify', { state: { email: formData.email } });

    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message);
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
