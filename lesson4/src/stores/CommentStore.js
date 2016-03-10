import SimpleStore from './SimpleStore'
import { SAVE_COMMENT, LOAD_ARTICLE_COMMENTS, _START, _FAIL, _SUCCESS} from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case SAVE_COMMENT + _START:
                    const tempComment =  Object.assign({}, data)
                    tempComment.loading = true
                    this.add(tempComment)
                    break
                case SAVE_COMMENT + _SUCCESS:
                    const comment = response
                    comment.loading = false
                    this.delete(data.id)
                    this.add(comment)
                    break
                case LOAD_ARTICLE_COMMENTS + _START:
                    this.changeArticleState(data.id, true)
                    break
                case LOAD_ARTICLE_COMMENTS + _FAIL:
                    this.changeArticleState(data.id, false, true)
                    break
                case LOAD_ARTICLE_COMMENTS + _SUCCESS:
                    this.changeArticleState(data.id, false, true)
                    response.records.forEach(this.add)
                    break
                default: return
            }

            this.emitChange()
        })
    }

    getArticle(id) {
        const articleStore = this.getStore("articles")
        return articleStore && articleStore.getById(id)
    }

    changeArticleState (id, loadingComments, commentsLoaded) {
        const article = this.getArticle(id)
        article && (article.loadingComments = loadingComments, article.commentsLoaded = commentsLoaded)
    }
}

export default CommentStore