import $ from 'jquery'

export function loadForArticle({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}

export function loadByParams(params) {
    return $.get('/api/comment', params)
}