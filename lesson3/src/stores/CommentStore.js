import SimpleStore from './SimpleStore'
import AppDispatcher from '../dispatcher'
import {ADD_COMMENT} from '../actions/constants'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        AppDispatcher.register((action) => {
            const {type, data} = action

            switch (type) {
                case ADD_COMMENT:
                    const {text} = data
                    this.add({text});
                    this.emitChange()
                    break;
            }
        })
    }
}

export default CommentStore