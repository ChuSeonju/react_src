import React from 'react';
import ReactDOM from 'react-dom/client';

import Menu from './components/Menu';
import data from './data/recipes.json';


function Cat({ name }) {
  return (
    <>
      <h1>고양이 이름은 {name} 입니다.</h1>
      <p>이 고양이는 예뻐요.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Menu recipes={data} />);
// root.render(
//     <Cat name="나비" />
// );
