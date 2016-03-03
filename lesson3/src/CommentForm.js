import React, { Component, PropTypes } from 'react'
import {addComment} from "./actions/comments"

class CommentForm extends Component {
	static propTypes = {
		placeHolder : PropTypes.string,
		articleId: PropTypes.number
	}

	state = {
		text : ""
	}

	render() {
		return (
			<form onSubmit = {this.handleSubmit}>
				<input type = "text" value={this.state.text} onChange={this.onChange} placeholder = {this.props.placeholder}></input>
				<input type = "submit" value = "Send"></input>
			</form>
		)
	}

	onChange = (e) => {
		this.setState({text: e.target.value});
	}

	handleSubmit = (e) => {
		const {text} = this.state
		e.preventDefault();
		this.setState({text: ""})
		text && addComment({
			articleId: this.props.articleId,
			text: text,
			//лучше логику генерации id вынести в AC
			id: Date.now()
		})

	}
}

export default CommentForm
