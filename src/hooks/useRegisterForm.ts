import { useState } from 'react';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordRepeat,
} from '../utils/user_validation';

export type FormField = 'email' | 'username' | 'password' | 'passwordRepeat';

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allTouched: Record<string, boolean> = {
      email: true,
      username: true,
      password: true,
      passwordRepeat: true,
    };
    setTouched(allTouched);

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

    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('Form submitted:', formData);
    }
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
