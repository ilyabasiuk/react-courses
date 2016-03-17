import React, {Component, PropTypes} from "react"
import commentStore from '../stores'

class CommentsPage extends Component {

    render() {
        return (
            <h1>Comments Page {this.props.params.pageNo}</h1>
        )
    }
}

export default CommentsPage