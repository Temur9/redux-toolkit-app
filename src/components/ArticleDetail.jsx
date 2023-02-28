import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ArticleService from "../service/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };
    getArticleDetail();
  }, [slug]);
  return (
    <>
      <div className="container"></div>
    </>
  );
};

export default ArticleDetail;
