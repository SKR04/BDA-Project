import React, { useState, createContext, useContext } from "react";

// Create a context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [courses, setCourses] = useState([]);
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [displayItem, setDisplayItem] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        courses,
        setCourses,
        items,
        setItems,
        searchItems,
        setSearchItems,
        displayItem,
        setDisplayItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the user context
const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
