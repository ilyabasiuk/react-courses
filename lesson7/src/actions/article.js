import {DELETE_ARTICLE} from "./constants"

export function deleteArticle(id) {
    console.log(id);
    return {
        type: DELETE_ARTICLE,
        data: {id}
    }
}