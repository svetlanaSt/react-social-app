export const requiredInput = (value) => {
  return !value ? `Enter your message` : undefined
};

export const maxLenghthCreator = (max) => (value) => {
  return value && value.length > max ? `Must be at least ${max}` : undefined
};
