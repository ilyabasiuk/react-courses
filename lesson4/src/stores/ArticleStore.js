import SimpleStore from './SimpleStore'
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARICLES, LOAD_ARTICLE_BY_ID, SAVE_COMMENT, LOAD_ARTICLE_COMMENTS, _START, _FAIL, _SUCCESS } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import { loadAllArticles } from '../actions/articles'

class ArticleStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
                    break
                case SAVE_COMMENT + _START:
                    AppDispatcher.waitFor([this.__stores.comments.dispatchToken])
                    const art = this.getById(data.article);
                    art.comments = (art.comments || []).concat(data.id);
                    break
                case SAVE_COMMENT + _SUCCESS:
                    AppDispatcher.waitFor([this.__stores.comments.dispatchToken])
                    const article = this.getById(data.article)
                    article.comments = article.comments.filter((comId) => comId !== data.id)
                    article.comments = article.comments.concat(response.id)
                    break
                case LOAD_ALL_ARICLES + _START:
                    this.loading = true
                    this.loaded = false
                    break

                case LOAD_ALL_ARICLES + _FAIL:
                    this.loaded = false
                    this.loading = false
                    this.error = error
                    break

                case LOAD_ALL_ARICLES + _SUCCESS:
                    this.loaded = true
                    this.loading = false
                    response.forEach(this.add)
                    break;

                case LOAD_ARTICLE_BY_ID + _START:
                    this.getById(data.id).loading = true
                    break;

                case LOAD_ARTICLE_BY_ID + _SUCCESS:
                    this.add(response)
                    break;

                case LOAD_ARTICLE_COMMENTS + _START:
                    this.changeArticleCommentsState(data.id, true)
                    break
                case LOAD_ARTICLE_COMMENTS + _FAIL:
                    this.changeArticleCommentsState(data.id, false, true)
                    break
                case LOAD_ARTICLE_COMMENTS + _SUCCESS:
                    this.changeArticleCommentsState(data.id, false, true)
                    break
                default: return
            }
            this.emitChange()
        })
    }

    getOrLoadAll() {
        if (!this.loading && !this.loaded) loadAllArticles()
        return this.getAll()
    }

    changeArticleCommentsState(articleId, loadingComments, commentsLoaded) {
        const article = this.getById(articleId)
        article && (article.loadingComments = loadingComments, article.commentsLoaded = commentsLoaded)
    }
}

export default ArticleStore