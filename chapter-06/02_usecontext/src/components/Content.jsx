import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

const Content = () => {
  const  user  = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      className="content"
      style={{
        backgroundColor: isDark ? 'black' : 'white',
        color: isDark ? 'white' : 'black'
      }}
    >
      <p>{user}님, 좋은 하루 되세요</p>
    </div>
  );
};

export default Content;