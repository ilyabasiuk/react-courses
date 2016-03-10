import React, { Component, PropTypes } from 'react'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        const {comment} = this.props
        return (
            <div>
                <p>{comment.user} : {comment.text}</p>
            </div>
        )
    }
}

export default Comment