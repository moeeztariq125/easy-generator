import { FC, ReactNode, createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const getAccessTokenFromCookie = () => Cookies.get('accessToken') || null;
  const getRefreshTokenFromCookie = () => Cookies.get('refreshToken') || null;
  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromCookie);
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromCookie);

  const login = (accessToken: string, refreshToken: string) => {
    Cookies.set('accessToken', accessToken, { expires: 7 }); // Set cookie to expire in 7 days
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };
  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
