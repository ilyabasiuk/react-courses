import React, { Component, PropTypes } from 'react'

class CommentForm extends Component {
	static propTypes = {
		placeHolder : PropTypes.string
	}

	render() {
		return (
			<form onSubmit = {this.handleSubmit}>
				<input type = "text" placeholder = {this.props.placeholder}></input>
				<input type = "submit" value = "Send"></input>
			</form>
		)
	}

	handleSubmit = (ev) => {
		ev.preventDefault();
		console.log("new comment");
	}
}

export default CommentForm
