import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing"
import Home from "./components/Homepage"
import Login from "./components/Login"
import Create from "./components/Create"
import Yourblogs from "./components/yourblogs"
import Signup from "./components/Signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/yourblogs" element={<Yourblogs />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;