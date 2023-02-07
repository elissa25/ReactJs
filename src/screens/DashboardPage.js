
import { useEffect, useState,Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid,Box,Typography,Button } from "@mui/material";

import Header from"../components/dashboard/header/Header";

import Article from"../components/dashboard/article/Article";
import NoArticlesFound from "../components/dashboard/article/NoArticlesFound";

import { getArticles } from "../store/articles/articles-actions";



function DashboardPage() {

  const [page, setPage] = useState(0);
  const { articles, searchedArticles, searchField,error,loading } = useSelector(
    (state) => state.articles
);

  const articlesToDispaly = searchField ? searchedArticles : articles;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(page));
    
  }, [dispatch,page]);

  const infiniteScroll = () => {
    setPage(page + 1);
    dispatch(getArticles(page));
  };

  useEffect(() => {

    const handleScroll = (page) => {
      const scrollHeight = page.target.documentElement.scrollHeight;
      const currentHeight =
      page.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight &&  !searchField) {
        infiniteScroll();
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {

      window.removeEventListener("scroll", handleScroll)};
  }, [page]);


  return (
    <Fragment>
      <header>
        <Header />
      </header>
      {articles.length===0 && loading===false && <NoArticlesFound />}
      <main>
        <Grid container spacing="50px">
          {articlesToDispaly &&
            articlesToDispaly.map((article, index) => (
              <Article
                key={index}
                abstract={article.abstract}
                lead_paragraph={article.lead_paragraph}
              
              />
            ))}
        </Grid>
      </main>
    </Fragment>
  );}

export default DashboardPage;
