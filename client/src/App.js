import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Dash from "./components/Dash";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const handleDash = (value) => {
    setIsLogged(value);
  };
  return (
    <div className="App">
      <Router>
        <Nav />
        <hr />
        {isLogged ? <Dash /> : <Home handleDash={handleDash} />}
        <hr />
      </Router>
    </div>
  );
}

export default App;
