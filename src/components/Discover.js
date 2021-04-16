import React from 'react';
import agent from '../agent';
import ArticleList from './ArticleList';
import { CHANGE_TAB } from '../constants/actionTypes';


const Discover = props => {
  const topics = agent.Topics.allTopics();
  const articles = false

  const clickHandler = ev => {
    ev.preventDefault();
    let articles = !articles
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };

  const Tabulate = props => {
    let tab;
    if (!topics) {
      return <div className="article-preview">Loading...</div>
    } else if (!articles) {
      tab = (
        <div style={{display: "block"}}>
          <div className="article-preview"
            style={{display: 'inline-grid',
              gridTemplateColumns: '15% 15% 15%',
              gridTemplateRows: '10px 10px 10px',
              columnGap: '140px',
              rowGap: '200px'}}>
          {topics.map((topic, i) => {
            return (
              <a onClick={clickHandler} key={i} href="">
              <div style={{display: 'flex', flexDirection: 'column', marginBottom: '40px'}}>
                <div style={{marginBottom: '5px', marginLeft: '10px', fontSize: "1em"}}>{topic.title}</div>
                <img loading="lazy" height="150px" width="150px" style={{border: '2px solid #f3f3f3', borderRadius: '30px'}} src={topic.image} />
              </div>
            </a>
            );
          })}
          </div>
          </div>)
    } else {
      tab = <ArticleList
          pager={props.pager}
          articles={props.articles}
          loading={props.loading}
          articlesCount={props.articlesCount}
      currentPage={props.currentPage} />
    }
    return tab;
  }

  const mapStateToProps = state => ({
    ...state.articleList,
    tags: state.home.tags,
    token: state.common.token
  });

  const mapDispatchToProps = dispatch => ({
    onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
  });

  return (
    <Tabulate tab={props.tab}
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        onTabClick={props.onTabClick}
    currentPage={props.currentPage} />
  );
}

export default Discover;
