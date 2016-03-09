import SimpleStore from './SimpleStore'
import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, _START, _FAIL, _SUCCESS  } from '../actions/constants'
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
                    this.loading = true;
                    var article = this.getArticle(data.id);
                    article && (article.loadingComments = true);
                    break
                case LOAD_ARTICLE_COMMENTS + _FAIL:
                    this.loading = false;
                    var article = this.getArticle(data.id);
                    article && (article.loadingComments = false);
                    break
                case LOAD_ARTICLE_COMMENTS + _SUCCESS:
                    this.loading = false;
                    var article = this.getArticle(data.id);
                    article && (article.loadingComments = false);
                    console.log(response);
                    break
                default: return
            }

            this.emitChange()
        })
    }

    getArticle(id) {
        const articleStore = this.getStore("articles");
        return articleStore && articleStore.getById(id);
    }
}

export default CommentStore