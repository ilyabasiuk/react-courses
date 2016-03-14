import React, { Component, PropTypes } from 'react'
import { articlesStore, commentStore } from '../stores'
import ArticleList from './ArticleList'
import { loadAllArticles } from './../actions/articles'
import Select from 'react-select'
import 'react-select/dist/react-select.css'


class Container extends Component {
    state = {
        selected: "",
        loading: true,
        articles: articlesStore.getOrLoadAll(),
        comments: commentStore.getAll()
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        commentStore.addChangeListener(this.change)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        commentStore.addChangeListener(this.change)
    }

    render() {
        const { articles, loading, selected} = this.state
        if (loading) return <h3>Loading...</h3>
        const options = articles.map((article) => ({value: article.id.toString(), label: article.title}))
        const selectedArr = this.state.selected.split(",").map((id) => +id)
        const articlesToShow = articles.filter((article) => (selectedArr.indexOf(article.id) > -1))
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={selected}
                    multi={true}
                    simpleValue={true}
                    options={options}
                    onChange={this.select}
                />
                <ArticleList articles = {articlesToShow} />
            </div>
        )
    }
    select = (val) => {
        this.setState({
            selected: val
        })
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    }
}

export default Container