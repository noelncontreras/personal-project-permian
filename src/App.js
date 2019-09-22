import React from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import routes from "./routes";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
