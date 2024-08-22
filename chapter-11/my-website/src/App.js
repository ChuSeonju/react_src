import React from "react";
import { Route, Switch as Routes, Redirect } from "react-router-dom";
import { Home, About, Events, Products, Contact, Whoops404 } from "./pages";

function App() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" component={Home}></Route>
        <Redirect from="/history" to="/about/history"></Redirect>
        <Redirect from="/services" to="/about/services"></Redirect>
        <Redirect from="/location" to="/about/location"></Redirect>
        <Route path="/about" component={About}></Route>
        <Route path="/events" component={Events}></Route>
        <Route path="/products" component={Products}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route component={Whoops404}></Route>
      </Routes>
    </div>
  );
}

export default App;
