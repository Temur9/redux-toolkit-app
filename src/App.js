import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { Main, Register, Navbar, Login, ArticleDetail } from "./components";
import { getItem } from "./helpers/persistance-storage";
import ArticleService from "./service/article";
import AuthService from "./service/auth";
import { getArticlesStart, getArticleSuccess } from "./slice/article";
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

  const getArticles = async () => {
    dispatch(getArticlesStart())
    try {
    const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
    getArticles();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/:slug" element={<ArticleDetail/>}/>
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
