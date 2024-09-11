import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import "./App.css";
import { Flex, Logo } from "vcc-ui";
import HomePage from "./Pages/HomePage";
import Learn from "./Pages/Learn";
import ShopMore from "./Pages/ShopMore";

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff" }}>
      <header style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <Flex
          extend={{
            width: "200px",
            height: "60px",
          }}
        >
          <Logo type="spreadmark" alt="Volvo Cars" />
        </Flex>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/shop/:id" element={<ShopMore />} />
      </Routes>
    </div>
  );
}

export default App;
