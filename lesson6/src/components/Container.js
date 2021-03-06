import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { articlesStore, usersStore } from '../stores'
import ArticleList from './ArticleList'
import { loadAllArticles, createNewArticle } from './../actions/articles'
import { login } from '../actions/user'
import translate from "../i18n"

class Container extends Component {
    state = {
        articles: articlesStore.getOrLoadAll(),
        loading: articlesStore.loading,
        currentUser: usersStore.currentUser,
        lang: "en"
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        usersStore.addChangeListener(this.changeUser)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        usersStore.removeChangeListener(this.changeUser)
    }

    static childContextTypes = {
        user: PropTypes.string,
        tr: PropTypes.func
    }

    getChildContext() {
        const {currentUser} = this.state
        return {
            user: currentUser,
            tr: this.tr
        }
    }

    tr = (value) => translate(value, this.state.lang)

    render() {
        const { loading, lang } = this.state
        if (loading) return <h3>{this.tr("Loading")}...</h3>
        return (
            <div>
                <a href= "#" className={lang=== "en" ? "selected" : ""} onClick = {this.setLang("en")}>En </a>
                <a href= "#" className={lang=== "ru" ? "selected" : ""} onClick = {this.setLang("ru")}>Ru </a>
                <a href = "#" onClick = {this.login}>{this.tr("Login")}</a>
                {this.getMenu()}
                {this.props.children}
            </div>
        )
    }

    login = (ev) => {
        ev.preventDefault()
        login()
    }
    setLang(lang) {
        return (ev) => {
            ev.preventDefault();
            this.setState({
                lang: lang
            })
        }
    }
    getMenu() {
        const links = this.state.articles.map((article) =>
            <li key={article.id}>
                <Link to={`/articles/${article.id}`}
                    activeClassName = "active"
                    activeStyle = {{color: 'red'}}
                >
                    {article.title}
                </Link>
            </li>)
        return <div>
            <ul>{links}</ul>
            <a href="#" onClick={this.handleNewClick}>{this.tr("createArticle")}</a>
        </div>
    }
    handleNewClick = (ev) => {
        ev.preventDefault()
        createNewArticle()
    }

    changeUser = () => {
        this.setState({
            currentUser: usersStore.currentUser
        })
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    };
}


export default Container