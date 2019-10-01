import React from "react";
import Header from "./Components/Header";
import routes from "./routes";
import './App.scss';

function App() {
  return (
    <div>
      <Header />
      {routes}
    </div>
  );
};

export default App;
