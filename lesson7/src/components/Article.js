import React, { Component, PropTypes } from 'react'
//import CommentList from './CommentList'
import { deleteArticle } from './../actions/article'
import translate from '../HOC/Translate'
require('./../style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        const {isOpen} = this.props
        return (
            <div>
                {this.getTitle()}
                {isOpen ? this.getBody(): null}
            </div>
        )
    }

    getTitle() {
        const { onClick, selected, article: { title } } = this.props
        const selectedStyle = selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={onClick}>
                {title}
            </h3>
        )
    }

    getBody() {
        const {article, translate} = this.props
        if (article.loading) return <div key="article!"><h2>{translate('loading')}...</h2></div>
        return (
            <div key="article">
                <a href="#" onClick = {this.handleDeleteArticle}>{translate('delete this article')}</a>
                <p>{article.body}</p>

            </div>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    };
}

export default translate(Article)