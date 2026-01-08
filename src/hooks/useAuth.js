import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return {
      user: null,
      isAuthenticated: false,
      hasRole: () => false,
    };
  }

  try {
    const user = jwtDecode(token);

    if (user.exp * 1000 < Date.now()) {
      return {
        user: null,
        isAuthenticated: false,
        hasRole: () => false,
      };
    }

    const hasRole = (roles) => {
      if (!user || !user.role) return false;
      return roles.includes(user.role);
    };

    return {
      user,
      isAuthenticated: true,
      hasRole,
    };
  } catch {
    return {
      user: null,
      isAuthenticated: false,
      hasRole: () => false,
    };
  }
}
