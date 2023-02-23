import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { Main, Register, Navbar, Login } from "./components";
import { getItem } from "./helpers/persistance-storage";
import AuthService from "./service/auth";
import { authUserSuccess } from "./slice/auth";

const App = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(authUserSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = getItem('token')
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
