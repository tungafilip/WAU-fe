import React, {Component} from 'react';
// @ts-ignore
import {Link, withRouter} from "react-router-dom";
import Cookies from "universal-cookie/es6";
import './NavBar.scss';

type NavBarProps = {
	history: any;
}

const cookie = new Cookies();
let loginRegister : boolean;

class NavBar extends Component<NavBarProps> {
	componentDidUpdate() {
		loginRegister = !cookie.get('user-api-key');
	}

	logoutHandler = () => {
		cookie.remove('user-api-key');
		this.props.history.push('/');
	}

	render() {
		return (
			<nav>
				<Link to="/">Home</Link>
				{ loginRegister ?
					<div>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div> :
					<div>
						<Link to="/settings">Settings</Link>
						<a onClick={this.logoutHandler}>Logout</a>
					</div>
				}
			</nav>
		);
	}
}

export default withRouter(NavBar);
