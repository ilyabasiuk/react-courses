import SimpleStore from './SimpleStore'
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_COMMENTS_BY_PARAMS, _SUCCESS, _FAIL, _START } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this._total = 0
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case ADD_COMMENT:
                    this.add({
                        id: data.id,
                        text: data.text
                    })
                    break;

                case LOAD_COMMENTS_FOR_ARTICLE + _SUCCESS:
                    response.forEach(this.add)
                    break

                case LOAD_COMMENTS_BY_PARAMS + _START:
                    this.loading = true
                    break;

                case LOAD_COMMENTS_BY_PARAMS + _SUCCESS:
                    this.loading = false
                    this.deleteAll()
                    this._total = response.total
                    response.records.forEach(this.add)
                    break;
                default: return
            }

            this.emitChange()
        })
    }

    getTotal() {
        return this._total
    }
}

export default CommentStore