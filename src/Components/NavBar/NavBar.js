import React, {Component} from 'react';
import './NavBar.scss';
import axios from "axios";

class NavBar extends Component {
	constructor(props) {
		super();

		this.state = {
			result: 'Click Me'
		};

		this.axiosTest = this.axiosTest.bind(this);
	}

	axiosTest() {
		axios.get('http://localhost:8000/api/test')
			.then(res => {
				const test = res.data;
				this.setState({result: test});
			});
	}

	render() {
		return (
			<nav>
				<ul>
					<li onClick={this.axiosTest}>{ this.state.result }</li>
					<li>Page #2</li>
					<li>Page #3</li>
					<li>Page #4</li>
				</ul>
			</nav>
		);
	}
}

export default NavBar;
