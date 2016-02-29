import React, {Component} from "react"
import ReactDOM from "react-dom"
require("./hint.css")

export default function (CustomComponent, getHoverText) {
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
			const text = getHoverText(this.props)
			const hoverStyle = this.state.showTooltip ? "hover-visible" : "hover-hidden"

			return (
				<div>
					<CustomComponent {...this.props}/>
					<span className={hoverStyle}> {text} </span>
				</div>
			)
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