export const validateRegisterInput = ({ name, email, password }) => {
  const errors = [];
  if (!name || name.trim().length === 0) errors.push('Name is required');
  if (!email || !email.includes('@')) errors.push('Valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  return { isValid: errors.length === 0, errors };
};
