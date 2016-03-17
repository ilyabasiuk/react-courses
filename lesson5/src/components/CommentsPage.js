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


    componentWillReceiveProps() {
        console.log("will receive")
    }

    render() {
        const {loading, total, comments} = this.state
        if (loading) return <h3>Loading...</h3>
        const list = comments.map((comment) => <li key={comment.id}><Comment comment={comment}/></li>)
        console.log(this.changePage)
        return (
            <div>
                <h1>Comments Page {this.props.params.pageNo} Total Commetns {total}</h1>
                {list}
                <Pager total={total} createLink={this.changePage}  perPage={this._commentsOnPage}></Pager>
            </div>
        )
    }

    changePage(pageNo) {
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