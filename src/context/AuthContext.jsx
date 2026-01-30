import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  RESTAURANT_OWNER: 'restaurant_owner',
  STAFF: 'staff',
  CUSTOMER: 'customer',
};

// Mock users - Chỉ giữ admin
const initialUsers = [
  {
    id: 1,
    email: 'admin@fbmanager.com',
    password: 'admin123',
    name: 'Super Admin',
    role: USER_ROLES.SUPER_ADMIN,
    avatar: null,
    phone: '0900000000',
    createdAt: new Date(2024, 0, 1).toISOString(),
  },
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Login - try backend API first, fallback to local mock users
  const login = async (email, password) => {
    const BASE_URL = 'https://apiqrcodeexe201-production.up.railway.app';

    try {
      const url = `${BASE_URL}/api/v1/auth/login`;
      const payload = { email: (email || '').trim().toLowerCase(), password };
      // Log request payload so we can compare browser vs Postman inputs
      console.debug('Auth login request:', url, payload);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

        const data = await resp.json();
        // Debug log to inspect backend response shape when Postman and browser differ
        console.debug('Auth login response:', resp.status, data);

        // Normalize common token/user locations
        const token = data?.token || data?.accessToken || data?.data?.token;
        const userFromBody = data?.user || data?.data?.user || data?.data || (typeof data === 'object' ? data : null);

        if (resp.ok) {
          if (token) localStorage.setItem('authToken', token);

          if (userFromBody && (userFromBody.email || userFromBody.role || userFromBody.id)) {
            const { password: _, ...userWithoutPassword } = userFromBody;
            setCurrentUser(userWithoutPassword);
            return { success: true, user: userWithoutPassword };
          }

          // If server returned a token but not a user object, accept login and set a minimal user
          if (token) {
            const guessedUser = { email };
            setCurrentUser(guessedUser);
            return { success: true, user: guessedUser };
          }

          // resp.ok but response shape unexpected
          return { success: false, error: 'Đăng nhập thất bại: phản hồi máy chủ không hợp lệ' };
        }

        // If server returns 4xx/5xx, surface message
        const serverError = data?.message || data?.error || 'Đăng nhập thất bại';
        if (!resp.ok) {
          return { success: false, error: serverError };
        }
    } catch (err) {
      // Network error — continue to fallback to local users below
      console.warn('Auth API unreachable, falling back to local mock auth:', err);
    }

    // Local fallback for development (checks local users list)
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Email hoặc mật khẩu không đúng' };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Register new user (restaurant owner) - try backend API, fallback to local
  const register = async (userData) => {
    const BASE_URL = 'https://apiqrcodeexe201-production.up.railway.app';

    // Basic client-side check for duplicate email in local store
    if (users.some(u => u.email === (userData.email || '').toLowerCase())) {
      return { success: false, error: 'Email đã được sử dụng' };
    }

    try {
      const url = `${BASE_URL}/api/v1/auth/register`;
      const payload = {
        name: userData.name,
        email: (userData.email || '').trim().toLowerCase(),
        password: userData.password,
        phone: userData.phone,
        role: userData.role || USER_ROLES.RESTAURANT_OWNER,
      };

      // Include restaurant/package fields expected by backend when provided.
      // Backend validation expects 'RestaurantName' and 'PackageID' (capitalized).
      if (userData.restaurantName || userData.RestaurantName || userData.restaurant_name) {
        const rName = userData.restaurantName || userData.RestaurantName || userData.restaurant_name;
        payload.RestaurantName = rName;
        // also include camelCase and snake_case aliases for compatibility
        payload.restaurantName = rName;
        payload.restaurant_name = rName;
      }

      const pkgId = userData.PackageID || userData.packageId || userData.package_id || userData.package_id;
      if (pkgId !== undefined && pkgId !== null) {
        payload.PackageID = pkgId;
        payload.packageId = pkgId;
        // snake_case alias expected by some backends
        payload.package_id = pkgId;
      }

      console.debug('Auth register request:', url, payload);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      console.debug('Auth register response:', resp.status, data);

      if (resp.ok) {
        // Normalize token/user locations
        const token = data?.token || data?.accessToken || data?.data?.token;
        const userFromBody = data?.user || data?.data?.user || data?.data || null;

        if (token) localStorage.setItem('authToken', token);

        if (userFromBody) {
          const { password: _, ...userWithoutPassword } = userFromBody;
          setUsers(prev => [...prev, userFromBody]);
          setCurrentUser(userWithoutPassword);
          return { success: true, user: userWithoutPassword };
        }

        // If server returned success but no user object, create minimal user locally
        const minimalUser = { id: Math.max(...users.map(u => u.id), 0) + 1, email: payload.email, role: payload.role, name: payload.name };
        setUsers(prev => [...prev, minimalUser]);
        setCurrentUser(minimalUser);
        return { success: true, user: minimalUser };
      }

      const serverError = data?.message || data?.error || 'Đăng ký thất bại';
      return { success: false, error: serverError };
    } catch (err) {
      // Network error or server unreachable — fallback to local register
      console.warn('Auth register API unreachable, falling back to local register:', err);

      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id), 0) + 1,
        role: userData.role || USER_ROLES.RESTAURANT_OWNER,
        createdAt: new Date().toISOString(),
      };

      setUsers(prev => [...prev, newUser]);
      const { password: _, ...userWithoutPassword } = newUser;
      return { success: true, user: userWithoutPassword };
    }
  };

  // Register staff
  const registerStaff = (staffData, restaurantId) => {
    if (users.some(u => u.email === staffData.email)) {
      return { success: false, error: 'Email đã được sử dụng' };
    }

    const newStaff = {
      ...staffData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      role: USER_ROLES.STAFF,
      restaurantId,
      createdAt: new Date().toISOString(),
    };

    setUsers(prev => [...prev, newStaff]);
    
    const { password: _, ...staffWithoutPassword } = newStaff;
    return { success: true, user: staffWithoutPassword };
  };

  // Update user profile
  const updateProfile = (userId, updates) => {
    setUsers(prev =>
      prev.map(user => {
        if (user.id === userId) {
          const updated = { ...user, ...updates };
          if (currentUser?.id === userId) {
            const { password: _, ...userWithoutPassword } = updated;
            setCurrentUser(userWithoutPassword);
          }
          return updated;
        }
        return user;
      })
    );
  };

  // Change password
  const changePassword = (userId, oldPassword, newPassword) => {
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return { success: false, error: 'Người dùng không tồn tại' };
    }

    if (user.password !== oldPassword) {
      return { success: false, error: 'Mật khẩu cũ không đúng' };
    }

    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, password: newPassword } : u))
    );

    return { success: true };
  };

  // Delete user
  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUser?.id === userId) {
      setCurrentUser(null);
    }
  };

  // Get all users (for admin)
  const getAllUsers = () => {
    return users;
  };

  // Get users by restaurant
  const getUsersByRestaurant = (restaurantId) => {
    return users.filter(
      u => u.restaurantId === restaurantId && u.role === USER_ROLES.STAFF
    );
  };

  // Check permissions
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.role === USER_ROLES.SUPER_ADMIN) return true;
    if (currentUser.role === USER_ROLES.RESTAURANT_OWNER) return true;
    if (currentUser.role === USER_ROLES.STAFF) {
      return currentUser.permissions?.includes(permission) || false;
    }
    return false;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  // Check user role
  const hasRole = (role) => {
    return currentUser?.role === role;
  };

  const value = {
    currentUser,
    users,
    login,
    logout,
    register,
    registerStaff,
    updateProfile,
    changePassword,
    deleteUser,
    getAllUsers,
    getUsersByRestaurant,
    hasPermission,
    isAuthenticated,
    hasRole,
    USER_ROLES,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
