import React, { Component, PropTypes } from 'react'
//import CommentList from './CommentList'
//import { deleteArticle } from './../actions/articles'
import translate from '../HOC/Translate'
require('./../style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        return (
            <div>
                {this.getTitle()}
                {this.getBody()}
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
                <p>{article.text}</p>

            </div>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    };
}

export default translate(Article)