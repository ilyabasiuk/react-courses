import { DELETE_ARTICLE, ADD_COMMENT_TO_ARTICLE } from '../actions/constants'
import { articles as defaultArticles} from '../fixtures'

export default (articles = defaultArticles, action) => {
    const { type, data } = action

    switch (type) {
        case DELETE_ARTICLE: return articles.filter((article) => article.id != data.id)
        case ADD_COMMENT_TO_ARTICLE:
           return articles.map((article) => {
                if (article.id === data.id) {
                    console.log("!!!!")
                    console.log(article)
                    article.comments = (article.comments || []).concat(data.commentId)
                    console.log(article)
                }
                return article
            } )
    }

    return articles
}