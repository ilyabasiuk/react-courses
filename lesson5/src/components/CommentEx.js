import React, { Component, PropTypes } from 'react'

class CommentEx extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        const {text, user} = this.props.comment
        return (
            <p>
                <span>{user}</span> : <span>{text}</span>
            </p>
        )
    }
}

export default CommentEx