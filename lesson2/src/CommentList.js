import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './HOC/toggleOpen'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        const { isOpen, toggleOpen} = this.props
        const actionText = isOpen ? 'hide comments' : 'show comments'

        const comments = this.props.comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {isOpen ? comments : null}
            </div>
        )
    }
}

export default toggleOpen(CommentList)