import React from "react";
import { Route, Routes } from "react-router";
import { Main, Register, Navbar, Login } from "./components";

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
};

export default App;

// 320px — 480px Мобильные устройства
// 481px — 768px Планшеты iPad
// 769px — 1024px ноутбуки с маленьким экраном
// 1025px — 1200px Настольные компьютеры большие экраны
// 1201px — и больше Очень большие экраны Телевизоры и т.д.
