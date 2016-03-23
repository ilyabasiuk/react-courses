import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment } from '../actions/counter'
import { getRelation } from '../utils'
import ArticleList from "../components/ArticleList"

class AppContainer extends Component {
    static propTypes = {
        counter: PropTypes.number,
        increment: PropTypes.func
    };

    render() {
        const { counter, articles, increment } = this.props
        return (
            <div>
                <h1 onClick={() => increment(10)}>{counter}</h1>
                <ArticleList articles={articles}></ArticleList>
            </div>
        )
    }

    getArticles() {
        return this.props.articles.map(article => <li key={article.id}>{article.title}: {getRelation(article, 'comments').length}</li>)
    }
}

export default connect((state) => {
    const {counter, articles} = state
    return {counter, articles}
}, {
    increment
})(AppContainer)