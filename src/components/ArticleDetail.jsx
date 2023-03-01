import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ArticleService from "../service/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import { Loader } from "../UI";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector((state) => state.article);

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        console.log(response);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };

    getArticleDetail();
  }, [slug]);

  return isLoading?(
    <Loader/>
  ): (
    articleDetail!==null&&(
<>
      <div className="container">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
          <p className="col-md-8 fs-4">{articleDetail.description}</p>
          <p className="text-muted">
            <span className="fw-bold">Created at: </span>
            {moment(articleDetail.createdAt).format("DD MMM, YYYY")}
          </p>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">
                  {articleDetail.author.username}
                </strong>
                <p className="card-text mb-auto">{articleDetail.author.bio}</p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img src={articleDetail.author.image} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div>{articleDetail.body}</div>
      </div>
    </>
    )
    
  );
};

export default ArticleDetail;
