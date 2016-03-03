import React, { Component, PropTypes } from 'react'

class CommentForm extends Component {
	static propTypes = {
		placeHolder : PropTypes.string
	}

	render() {
		return (
			<div>
				<input type="text" placeholder = {this.props.placeholder}></input>
				<button>Send Comment</button>
			</div>
		)
	}
}

export default CommentForm
