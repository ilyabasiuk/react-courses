import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

class Pager extends Component {
    static propTypes = {
        total: PropTypes.number,
        perPage: PropTypes.number,
        //createLink: PropTypes.function
        // Получаю ошибку если раскоментить, непонятно почему :(
        // - warning.js:45 Warning: Failed propType: Pager: prop type `createLink` is invalid; it must be a function, usually from React.PropTypes. Check the render method of `CommentsPage`.
    }

    render () {
       const count = this.getCountPages()
       const btns = Array.apply(null, Array(count)).map((item, index) =>
            <Link to={this.getLink(index + 1)} key={index}>
                <button>{index + 1}</button>
            </Link>)
       return (
            <div>
                {btns}
            </div>
       )
    }

    getLink(pageNo) {
        return this.props.createLink(pageNo)
    }

    getCountPages() {
        const {total, perPage} = this.props
        return Math.floor(total/perPage) + (total%perPage > 0 ? 1 : 0)
    }
}

export default Pager
