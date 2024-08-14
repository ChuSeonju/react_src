import React from "react";

import { faker } from "@faker-js/faker";

// 대량 데이터
const bigList = [...Array(1000)].map(() => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
}));

function List({ data = [], renderItem, renderEmpty }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default function App_bigList() {
  const renderItem = (item) => (
    <div style={{ display: "" }}>
      <img src={item.avatar} alt={item.username} width={50} />
      <p>
        {item.name} : {item.email}
      </p>
    </div>
  );

  return (
    <List
      data={bigList}
      renderEmpty={<p>This list is empty</p>}
      renderItem={renderItem}
    />
  );
}
