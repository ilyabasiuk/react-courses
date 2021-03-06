import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './../HOC/toggleOpen'
import { connect } from 'react-redux'
import translate from '../HOC/Translate'
import { getRelation } from '../utils'
import { addComment } from '../actions/comment'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object,
        user: PropTypes.string
    }

    state = {
        comment: ''
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.isOpen || this.props.isOpen || this.checkComments(newProps)) return
        //loadCommentsForArticle({
        //    articleId: newProps.article.id
        //})
    }

    render() {
        const { isOpen, toggleOpen, translate } = this.props
        const actionText = translate(isOpen ? 'hide comments' : 'show comments')

        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
//        console.log('--- context: ', this.context.user);
        const { article, isOpen, translate } = this.props
        if (!isOpen) return null
        if (!this.checkComments()) return <h3>{translate('loading')}...</h3>
        const commentList = getRelation(article, 'comments').map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                user: {this.context.user}
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
        this.props.addComment(this.state.comment, this.props.article.id)
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

    checkComments(props) {
        props = props || this.props
        return !(getRelation(props.article, 'comments').includes(undefined))
    }
}

export default connect(null, {addComment} )(translate(toggleOpen(CommentList)))