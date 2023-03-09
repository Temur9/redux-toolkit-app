import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ArticleService from "../service/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import CreateForm from "./create-form";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };
    getArticleDetail();
  }, []);

  const formSubmit = () => {};

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
        <h1 className="fs-2">Edit Article</h1>
        <div className="w-75 mx-auto">
          <CreateForm {...formProps} />
        </div>
      </div>
    </>
  );
};

export default EditArticle;
