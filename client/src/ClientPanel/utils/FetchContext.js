import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = sessionStorage.getItem('session');
        if (!session) {
          // Handle case where session token is not found in localStorage
          return;
      }
        const response = await axios.get(`http://localhost:3001/user?session=${session}`);

        setUserData(response.data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = (newUserData) => {
    setUserData(newUserData);
  };


  return (
    <FetchContext.Provider value={{ userData, updateUser}}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => useContext(FetchContext);
