import ReactDOM from "react-dom"
require("./hint.css")
export default {
	getInitialState() {
		return {
			showTooltip: false
		}
	},

	componentDidMount() {
		var el = ReactDOM.findDOMNode(this);
		el.addEventListener('mouseenter', this.mouseenter, false);
		el.addEventListener('mouseleave', this.mouseleave, false);
	},

	mouseenter () {
		this.setState({
			showTooltip: true
		})
	},
	mouseleave() {
		this.setState({
			showTooltip: false
		})
	}
}
