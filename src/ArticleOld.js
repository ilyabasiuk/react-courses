import React, { Component } from 'react'
import CommentList from './CommentList'
import toggleOpen from './mixins/toggleOpen'
import hint from './mixins/hint'

const Article = React.createClass({
    mixins: [toggleOpen, hint],

    componentDidMount() {
        console.log('---', this.refs.container);
    },

    render() {
        const hoverStyle = this.state.showTooltip ? "hover-visible" : "hover-hidden";
        const text = this.getHintText()
        return (
            <div ref="container">
                <a href = "#" onClick = {this.select.bind} >select</a>
                {this.getTitle()}
                {this.getBody()}
                <span className={hoverStyle}> {text} </span>
            </div>

        )
    },

    getHintText() {
        return this.props.article.title + " (my hover) "
    },

    getTitle() {
        const { title } = this.props.article
        const selectedStyle = this.props.selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={this.toggleOpen}>
                {title}
            </h3>
        )
    },

    getBody() {
        if (!this.state.isOpen) return null
        const {article} = this.props
        return (
            <div>
                <p>{article.body}</p>
                <CommentList comments = {article.comments || []} />
            </div>
        )
    },

    select(ev) {
        ev.preventDefault()
        this.props.select()
    }
})

export default Article