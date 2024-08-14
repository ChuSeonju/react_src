import React, { useReducer } from "react";

const firstUser = {
  id: "0391-3233-3201",
  firstName: "Bill",
  lastName: "Wilson",
  city: "Missoula",
  state: "Montana",
  email: "bwilson@mtnwilsons.com",
  admin: false,
};

const reducer = (user, newDetails) => ({ ...user, ...newDetails });

function User() {
  const [user, dispatch] = useReducer(reducer, firstUser);

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName} - {user.admin ? "Admin" : "User"}
      </h1>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.city}, {user.state}
      </p>
      <button
        onClick={() => {
          dispatch({ admin: true });
        }}
      >
        Make Admin
      </button>
    </div>
  );
}

export default function Usereducercomplex2() {
  return <User />;
}
