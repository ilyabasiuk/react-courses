import { ADD_COMMENT, ADD_COMMENT_TO_ARTICLE } from "./constants"

export function addComment(text, articleId) {
    const id = Date.now()

    return [{
        type: ADD_COMMENT,
        data: {
            text,
            id
        }
    }, {
       type: ADD_COMMENT_TO_ARTICLE,
       data: {
           id: articleId,
           commentId: id
       }
}]
}