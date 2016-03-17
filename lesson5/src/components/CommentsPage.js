import React, {Component} from "react"
import {commentStore} from '../stores'
import {loadCommentsByParams as loadByParams} from '../actions/comment'
import Comment from './CommentEx'
import Pager from './Pager'

class CommentsPage extends Component {
    constructor(props) {
        super()
        this._commentsOnPage = 10
        loadByParams(this.getQueryParamsByPageNo(props.params.pageNo))
        this.state = this.createState()
    }

    createState () {
        return {
            comments: commentStore.getAll(),
            loading: commentStore.loading,
            total: commentStore.getTotal()
        }
    }

    componentWillMount() {
        commentStore.addChangeListener(this.change);
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.change);
    }


    componentWillReceiveProps(props) {
        if (!commentStore.loading) {
            loadByParams(this.getQueryParamsByPageNo(props.params.pageNo))
        }
    }

    render() {
        const {loading, total, comments} = this.state
        let list = <h3>Loading...</h3>
        if (!loading) list = comments.map((comment) => <li key={comment.id}><Comment comment={comment}/></li>)
        return (
            <div>
                <h1>Comments Page {this.props.params.pageNo} Total Commetns {total}</h1>
                {list}
                <Pager total={total} createLink={this.createLink}  perPage={this._commentsOnPage}></Pager>
            </div>
        )
    }

    createLink(pageNo) {
        return `/comments/${pageNo}`
    }

    getQueryParamsByPageNo (pageNo) {
        return {
            limit: this._commentsOnPage,
            offset: this._commentsOnPage * (pageNo -1)
        }
    }

    change = () => {
        this.setState(this.createState())
    }
}

export default CommentsPage