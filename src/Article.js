import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
import toggleOpen from './HOC/toggleOpen'
import hint from './HOC/hint'
import CSSTransition from 'react-addons-css-transition-group'
require('./style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    componentDidMount() {
    }

    render() {
        return (
            <div ref="container">
                <a href = "#" onClick = {this.select.bind(this)} >select</a>
                {this.getTitle()}
                <CSSTransition transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {this.getBody()}
                </CSSTransition>
            </div>
        )
    }

    getTitle() {
        const { title } = this.props.article
        const selectedStyle = this.props.selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={this.props.toggleOpen}>
                {title}
            </h3>
        )
    }

    getBody() {
        if (!this.props.isOpen) return null
        const {article} = this.props
        return (
            <div key="article">
                <p>{article.body}</p>
                <CommentList comments = {article.comments || []} />
            </div>
        )
    }

    getHintText () {
        return this.props.article.title;
    }

    select(ev) {
        ev.preventDefault()
        this.props.select()
    }
}

export default hint(toggleOpen(Article), (props) => props.article.title + " (my hover)")
//Question: можно ли сделать HOC hint применимым к любому компоненту не прибегая к передаче функции, а ,например,
// чтобы он искал нужное свойсвто у родиетельского компоненета и именно его и отображал как текст хинта,
// либо чтобы дергал функцию компоненента для получения текста хинта (вроде getHintText)?