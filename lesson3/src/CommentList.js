import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import CommentFrom from './CommentForm'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        articleId: PropTypes.number
    };

    state = {
        isOpen: false
    }

    render() {
        const { isOpen } = this.state
        const actionText = isOpen ? 'hide comments' : 'show comments'

        return (
            <div>
                <a href = "#" onClick = {this.toggleOpen}>{actionText}</a>
                {this.getCommentsBlock()}
            </div>
        )
    }

    getCommentsBlock = () => {
        const { isOpen } = this.state
        const comments = this.props.comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        const form = <CommentFrom articleId = {this.props.articleId} placeholder = "Type your comment"></CommentFrom>

        return isOpen ? (
            <div>
                <ul> {comments} </ul>
                {form}
            </div>
        ) : null
    }

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default CommentList