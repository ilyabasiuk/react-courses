import $ from 'jquery'

export function loadCommentsByArticle(article) {
    const {id} = article
    return $.get('/api/comment/', {
        data: { article : id }
    })
}

export function save(comment) {
    return $.post('/api/comment/', {
        data: comment
    })
}