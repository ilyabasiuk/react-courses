import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './../HOC/toggleOpen'
import { saveComment, loadCommentsForArticle } from './../actions/comment'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    state = {
        comment: ''
    }

    componentWillReceiveProps (newProps) {
        const {article} = newProps
        const {id} = article
        if (!article.commentsLoaded && article.loadingComments !== true) {
            loadCommentsForArticle({id});
        }
    }

    render() {
        const { isOpen, toggleOpen } = this.props
        const actionText = isOpen ? 'hide comments' : 'show comments'

        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null
        if (article.loadingComments ) return <div><h2>Loading...</h2></div>
        const commentList = article.getRelation('comments').map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                <ul>{isOpen ? commentList : null}</ul>
                <input value = {this.state.comment} onChange = {this.commentChange}/>
                <a href = "#" onClick = {this.submitComment}>add comment</a>
            </div>
        )
    }

    commentChange = (ev) => {
        this.setState({
            comment: ev.target.value
        })
    }

    submitComment = (ev) => {
        ev.preventDefault()
        saveComment({
            text: this.state.comment,
            article: this.props.article.id
        })
        this.setState({
            comment: ''
        })
    }

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default toggleOpen(CommentList)