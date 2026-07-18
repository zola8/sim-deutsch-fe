export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validateUsername = (username: string): string => {
  if (!username) return 'Username is required';
  if (username.length < 5) return 'Username must be at least 5 characters';
  if (username.length > 100) return 'Username must be less than 100 characters';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 20) return 'Password must be less than 20 characters';
  return '';
};

export const validatePasswordRepeat = (
  password: string,
  passwordRepeat: string
): string => {
  if (!passwordRepeat) return 'Please confirm your password';
  if (password !== passwordRepeat) return 'Passwords do not match';
  return '';
};
