import AppDispatcher from '../dispatcher'
import {ADD_COMMENT} from './constants'

export function addComment (comment) {
    comment.id = Date.now();
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: comment
    })
}
