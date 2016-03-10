import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SAVE_COMMENT } from './constants'
import { asyncAC } from './api/utils'
import { loadCommentsByArticle, save } from './api/comment'

export const saveComment = function (comment) {
    const data = comment
    data.user = comment.user || "Anonymous"
    data.tempId = Date.now()
    asyncAC(SAVE_COMMENT, save)(data)
}
export const loadCommentsForArticle = asyncAC(LOAD_ARTICLE_COMMENTS, loadCommentsByArticle)