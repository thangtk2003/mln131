/**
 * API Configuration and Base URL
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const API_ENDPOINTS = {
  // Theory
  theory: `${API_BASE_URL}/theory/sections/`,

  // Cases
  cases: `${API_BASE_URL}/cases/`,
  casesMap: `${API_BASE_URL}/cases/map_data/`,
  casesFeatured: `${API_BASE_URL}/cases/featured/`,

  // Forum
  posts: `${API_BASE_URL}/forum/posts/`,
  postsSolutions: `${API_BASE_URL}/forum/posts/solutions/`,
  postsTrending: `${API_BASE_URL}/forum/posts/trending/`,
  postsInsights: `${API_BASE_URL}/forum/posts/insights/`,
  comments: `${API_BASE_URL}/forum/comments/`,

  // Auth
  authToken: `${API_BASE_URL}/auth/token/`,
  authRefresh: `${API_BASE_URL}/auth/token/refresh/`,
} as const;

export default API_BASE_URL;
