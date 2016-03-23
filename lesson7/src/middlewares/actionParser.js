export default store => next => action => {
    Array.isArray(action)?
        action.forEach(store.dispatch) :
        next(action)
}
