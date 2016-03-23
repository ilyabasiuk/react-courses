import { DELETE_ARTICLE, ADD_COMMENT_TO_ARTICLE } from '../actions/constants'
import { articles as defaultArticles} from '../fixtures'

export default (articles = defaultArticles, action) => {
    const { type, data } = action

    switch (type) {
        case DELETE_ARTICLE: return articles.filter((article) => article.id != data.id)
        case ADD_COMMENT_TO_ARTICLE:
           return articles.map((article) => {
                if (article.id === data.id) {
                    article.comments = (article.comments || []).concat(data.commentId)
                }
                return article
            } )
    }

    return articles
}