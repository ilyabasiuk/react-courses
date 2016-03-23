import store from './store'

export function getRelation(entity, relation) {
    const state = store.getState()
    if (!entity[relation] || !state[relation]) return []
    return state[relation].filter(el => entity[relation].includes(el.id))
}