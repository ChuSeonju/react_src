import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoginId, setUserLoginId] = useState(() => {
    const savedUser_id = sessionStorage.getItem("user_id");
    return savedUser_id ? JSON.parse(savedUser_id) : null;
  });

  useEffect(() => {
    if (userLoginId) {
      sessionStorage.setItem("user_id", JSON.stringify(userLoginId));
    } else {
      sessionStorage.removeItem("user_id");
    }
  }, [userLoginId]);

  // 초기 사용자 id 설정 (임시)
  useEffect(() => {
    setUserLoginId("man111");
  }, []);

  return (
    <UserContext.Provider value={{ userLoginId, setUserLoginId }}>
      {children}
    </UserContext.Provider>
  );
};
