import React, { Component, PropTypes } from 'react'
import {noAccessToCreate} from './../actions/articles'

class NewArticle extends Component {
    static propTypes = {

    };
    static contextTypes = {
        user: PropTypes.string
    }
    componentWillMount() {
        if (!this.context.user) {
            noAccessToCreate()
        }
    }

    render() {
        return (
            <div>
                <h2>New Article Page</h2>
            </div>
        )
    }
}

export default NewArticle