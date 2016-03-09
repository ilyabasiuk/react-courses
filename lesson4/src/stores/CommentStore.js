import SimpleStore from './SimpleStore'
import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, _START, _FAIL, _SUCCESS} from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case ADD_COMMENT:
                    this.add({
                        id: data.id,
                        text: data.text
                    })
                    break;
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