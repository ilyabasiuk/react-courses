import React, { Component, PropTypes } from 'react'

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
		e.preventDefault();
		console.log("new comment", {
			articleId: this.props.articleId,
			text: this.state.text
		});
	}
}

export default CommentForm
