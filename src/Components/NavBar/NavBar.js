import React, {Component} from 'react';
import {Link} from "react-router-dom";
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
		axios.get('https://localhost:8000/api/top')
			.then(res => {
				const test = res.data;
				this.setState({result: test});
			});
	}

	render() {
		return (
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link to="/logout">Logout</Link>
			</nav>
		);
	}
}

export default NavBar;
