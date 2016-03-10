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

    getStore(id) {
        return this.__stores[id];
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
        return this.__items.slice().sort((a,b) => a.id - b.id)
    }

    getById = (id) => {
        return this.__items.filter((item) => item.id == id)[0]
    }

    getByTempId = (tempId) => {
        return this.__items.filter((item) => item.tempId == tempId)[0]
    }

    add = (item) => {
        this.delete(item.id)
        this.__items.push(new Model(item, this.__stores))
    }

    delete(id) {
        this.__items = this.__items.filter(item => item.id != id)
    }

    deleteByTempId = (tempId) => {
        this.__items = this.__items.filter(item => item.tempId != tempId)
    }
}

export default SimpleStore