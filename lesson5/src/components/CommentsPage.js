import React, {Component, PropTypes} from "react"
import {commentStore} from '../stores'
import {loadCommentsByParams as loadByParams} from '../actions/comment'

class CommentsPage extends Component {
    constructor(props) {
        super()
        this.commentsOnPage = 10
        this.state = {
            comments: commentStore.getAll()
        }
        loadByParams(this.getQueryParamsByPageNo(props.params.pageNo))
    }

    componentWillReceiveProps() {
        console.log("wiil receive")
    }

    render() {
        return (
            <h1>Comments Page {this.props.params.pageNo}</h1>
        )
    }

    getQueryParamsByPageNo (pageNo) {
        return {
            limit: this.commentsOnPage,
            offset: this.commentsOnPage * (pageNo -1)
        }
    }
}

export default CommentsPage