
import { articlesActions } from "./articles-slice";
import axios from "axios";

export const getArticles = (page) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(articlesActions.articlesRequest());
    await axios.get("http://34.245.213.76:3000/articles", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: page,
        }
    })
    .then((res)=>{
        dispatch(articlesActions.successArticles(res.data.response.docs));
    })
    .catch((err)=>{
        dispatch(articlesActions.failedArticles(err.message))
    })
  };
};