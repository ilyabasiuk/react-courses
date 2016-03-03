import React, {Component} from "react"
import ReactDOM from "react-dom"
require("./hint.css")

export default function (CustomComponent) {
	return class extends Component {
		state = {
			showTooltip: false
		}

		componentDidMount() {
			var el = ReactDOM.findDOMNode(this);
			el.addEventListener('mouseenter', this.mouseenter.bind(this), false);
			el.addEventListener('mouseleave', this.mouseleave.bind(this), false);
			//Question: можно ли в синтаксисе jsx навесить эти обработчики ?
		}
		render () {
			return <CustomComponent {...this.state} {...this.props} />
		}
		mouseenter () {
			this.setState({
				showTooltip: true
			})
		}
		mouseleave() {
			this.setState({
				showTooltip: false
			})
		}
	}
}