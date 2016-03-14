import $ from 'jquery'

export function loadCommentsByArticle(article) {
    const {id} = article
    return $.get('/api/comment/', {
        data: { article : id }
    })
}

export function save(comment) {
    return $.ajax('/api/comment/', {
        method: "POST",
        data: JSON.stringify(comment),
        contentType: "application/json;charset=UTF-8"
    })
}