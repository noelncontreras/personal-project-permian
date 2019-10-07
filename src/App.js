import React from "react";
import Header from "./Components/Header";
import routes from "./routes";
import './App.scss';

function App() {
  return (
    <div>
      <Header />
      <div id="routes-container">
        {routes}
      </div>
    </div>
  );
};

export default App;
