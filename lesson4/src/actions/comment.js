import AppDispatcher from '../dispatcher'
import { ADD_COMMENT } from './constants'
import { asyncAC } from './api/utils'

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

export function loadCommentsForArticle (articleId) {
    console.log("loadCommentsForArticle", articleId);
}