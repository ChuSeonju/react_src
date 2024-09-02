// components/home/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheet/home.css';

export const Menu = () => {
  return (
    <div>
      <ul id='home'>
        <li><Link to="/news">어제의 뉴스</Link></li>
        <li><Link to="/news">오늘의 뉴스</Link></li>
        <li><Link to="/news">내일의 뉴스</Link></li>
      </ul>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <h1>뉴스 홈페이지</h1>
      <Menu />
    </>
  );
};

export default Home;
