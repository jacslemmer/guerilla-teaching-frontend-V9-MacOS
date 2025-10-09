// API Configuration
// Automatically uses the correct API URL based on environment

export const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:8787'
    : 'https://guerilla-teaching-website.jaco-lemmer.workers.dev'
  );

export const getApiUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
