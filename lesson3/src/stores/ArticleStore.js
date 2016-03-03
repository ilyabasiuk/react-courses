import SimpleStore from './SimpleStore'
import { DELETE_ARTICLE, ADD_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import {commentStore} from './index'

class ArticleStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
                    break;

                case ADD_COMMENT:
                    //wait for Coomment store will be updated
                    AppDispatcher.waitFor([commentStore.dispatchToken]);
                    this.addComment(data.articleId, data.id);
                    break;
                default: return
            }

            this.emitChange()
        })
    }

    addComment = (articleId, commentId) => {
        const article = this.getById(articleId);
        let comments = article.comments || [];
        comments.push(commentId);
        article.comments = comments;
    }
}

export default ArticleStore