import { ADD_COMMENT } from "./constants"
export function addComment(data) {
    console.log("add comment", data);
    return {
        type: ADD_COMMENT,
        data: data
    }
}