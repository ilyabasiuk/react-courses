import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { articlesStore, usersStore } from '../stores'
import ArticleList from './ArticleList'
import { loadAllArticles, createNewArticle } from './../actions/articles'
import { login } from '../actions/user'
import dictionary from '../dictionary'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: articlesStore.getOrLoadAll(),
            language: props.params.lang,
            loading: articlesStore.loading,
            currentUser: usersStore.currentUser
        }

    }

    componentWillReceiveProps(props) {
        this.setState({
            language: props.params.lang
        })
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
        i18n: PropTypes.object
    }

    getChildContext() {
        return {
            user: this.state.currentUser,
            i18n: dictionary[this.state.language]
        }
    }

    render() {
        const { loading } = this.state
        const route = this.props.location.pathname.split('/').slice(2).join('/')
        if (loading) return <h3>Loading...</h3>
        return (
            <div>
                <a href = "#" onClick = {this.login}>Login</a>
                <ul>
                    <li><Link to={`/en/${route}`}>EN</Link></li>
                    <li><Link to={`/ru/${route}`}>RU</Link></li>
                </ul>
                {this.getMenu()}
                {this.props.children}
            </div>
        )
    }

    changeLang = (language) => (ev) => {
        ev.preventDefault()
        this.setState({ language })
    }

    login = (ev) => {
        ev.preventDefault()
        login()
    }

    getMenu() {
        const { articles, language } = this.state
        const links = articles.map((article) =>
            <li key={article.id}>
                <Link to={`/${language}/articles/${article.id}`}
                    activeClassName = "active"
                    activeStyle = {{color: 'red'}}
                >
                    {article.title}
                </Link>
            </li>)
        return <div>
            <ul>{links}</ul>
            <a href="#" onClick={this.handleNewClick}>create new article</a>
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