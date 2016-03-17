import React, {Component, PropTypes} from "react"
import {commentStore} from '../stores'
import {loadCommentsByParams as loadByParams} from '../actions/comment'

class CommentsPage extends Component {
    constructor(props) {
        super()
        this.commentsOnPage = 10
        loadByParams(this.getQueryParamsByPageNo(props.params.pageNo))
        this.state = {
            comments: commentStore.getAll(),
            loading: commentStore.loading
        }
    }

    componentWillMount() {
        commentStore.addChangeListener(this.change);
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.change);
    }


    componentWillReceiveProps() {
        console.log("will receive")
    }

    render() {
        const { loading } = this.state
        if (loading) return <h3>Loading...</h3>
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

    change = () => {
        this.setState({
            comments: commentStore.getAll(),
            loading: commentStore.loading
        })
    }
}

export default CommentsPage