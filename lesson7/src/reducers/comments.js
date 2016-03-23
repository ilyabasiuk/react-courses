import { ADD_COMMENT } from '../actions/constants'
import {comments as defaultComents} from '../fixtures'

export default (comments = defaultComents, action) => {
    const { type, data } = action

    switch (type) {
        case ADD_COMMENT:
            const {id, text} = data
            return comments.concat({id, text})
    }

    return comments
}