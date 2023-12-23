import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};