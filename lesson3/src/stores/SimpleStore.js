import { EventEmitter } from 'events'
import Model from './Model'
const CHANGE_EVENT = 'CHANGE_EVENT'


class SimpleStore extends EventEmitter {
    constructor(stores, initialState) {
        super()
        this.__stores = stores
        this.__items = []
        if (initialState) initialState.forEach(this.add)
    }

    emitChange() {
        this.emit(CHANGE_EVENT)
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getAll() {
        return this.__items.slice()
    }

    getById = (id) => {
        return this.__items.filter((item) => item.id == id)[0]
    }

    add = (item) => {
        //!item.id && (item.id = Date.now() + Math.floor(Math.random() * 999999));
        // хотелось бы оставить генерацию идишки сдесь , но тогда проблемно её получить в артикл строе для привязке к статье
        this.__items.push(new Model(item, this.__stores))
    }

    delete(id) {
        this.__items = this.__items.filter(item => item.id != id)
    }


}

export default SimpleStore