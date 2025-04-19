import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  username: string;
  createdAt: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUsername: (username: string) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const defaultUserContext: UserContextType = {
  userProfile: null,
  setUsername: () => {},
  isLoggedIn: false,
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('wordleUserProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('wordleUserProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const setUsername = (username: string) => {
    if (!userProfile) {
      const newProfile: UserProfile = {
        username,
        createdAt: new Date().toISOString(),
      };
      setUserProfile(newProfile);
    } else {
      setUserProfile({
        ...userProfile,
        username,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('wordleUserProfile');
    setUserProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUsername, 
        isLoggedIn: !!userProfile,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 