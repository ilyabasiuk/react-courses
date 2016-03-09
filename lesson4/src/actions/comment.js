import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS } from './constants'
import { asyncAC } from './api/utils'
import { loadCommentsByArticle } from './api/comment'

export function addComment(text, articleId) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: {
            text,
            id: Date.now(),
            articleId
        }
    })
}

export const loadCommentsForArticle = asyncAC(LOAD_ARTICLE_COMMENTS, loadCommentsByArticle);