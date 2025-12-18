import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    return { user: null, isAuthenticated: false };
  }
  
  try {
    const user = jwtDecode(token);
    
    if (user.exp * 1000 < Date.now()) {
      return { user: null, isAuthenticated: false };
    }
    
    return {
      user,
      isAuthenticated: true,
    };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}