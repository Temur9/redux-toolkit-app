import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ArticleService from "../service/article";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import CreateForm from "./create-form";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      await ArticleService.postArticle(article);
      dispatch(postArticleSuccess());
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure());
    }
  };
  const formProps = {
    title,
    description,
    body,
    setTitle,
    setDescription,
    setBody,
    formSubmit,
  };
  return (
    <>
      <div className="text-center">
        <h1 className="fs-2">Create Article</h1>
        <div className="w-75 mx-auto">
          <CreateForm {...formProps} />
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
