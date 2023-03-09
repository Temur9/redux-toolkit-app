import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArticleService from "../service/article";
import { getArticlesStart, getArticleSuccess } from "../slice/article";
import { Loader } from "../UI";
const Main = () => {
  const { articles, isLoading } = useSelector((state) => state.article);
  const { user, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className="container">
        {isLoading && <Loader />}
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {articles.map((item) => (
                <div className="col" key={item.favoritesCount}>
                  <div className="card shadow-sm h-100">
                    <svg
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false">
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                        Thumbnail
                      </text>
                    </svg>
                    <div className="card-body">
                      <p className="card-text fw-bold">{item.title}</p>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          onClick={() => navigate(`/article/${item.slug}`)}
                          type="button"
                          className="btn btn-sm btn-outline-success">
                          View
                        </button>
                        {loggedIn && user.username === item.author.username && (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={()=>navigate(`/edit-article/${item.slug}`)}
                              >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteArticle(item.slug)}>
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                      <small className="text-muted fw-bold text-capitalize">
                        {item.author.username}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
