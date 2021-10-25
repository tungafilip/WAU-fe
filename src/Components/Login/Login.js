import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie/es6";

import './Login.scss';
import axios from "axios";

const cookie = new Cookies();

class Login extends Component {
	componentDidMount() {
		if (cookie.get('user-api-key')) {
			axios.post('https://localhost:8000/api/get/user/by/api', {
				apiKey: cookie.get('user-api-key')
			}).then((response) => {
				if (response.data.delete) {
					console.log(response.data.delete);
					cookie.remove('user-api-key');
				} else {
					this.props.history.push('/');
				}
			}).catch((error) => {
				console.log(error);
			})
		}
	}

	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		}
	}

	usernameChangeHandler = (event) => {
		let email = event.target.value;
		this.setState({email: email});
	}

	passwordChangeHandler = (event) => {
		let password = event.target.value;
		this.setState({password: password});
	}

	formSubmitHandler = (event) => {
		event.preventDefault();
		axios.post('https://localhost:8000/api/login', {
			email: this.state.email,
			password: this.state.password
		}).then((response) => {
			if (response.data.error) {
				console.log(response.data.error)
			} else if (response.data.userApiKey) {
				cookie.set('user-api-key', response.data.userApiKey);
				this.props.history.push('/');
			}
		}).catch((error) => {
			console.log(error.response.data);
		})
	}

	render() {
		return (
			<div className='login'>
				<form onSubmit={this.formSubmitHandler}>
					<label htmlFor="email">Email:</label>
					<input onChange={this.usernameChangeHandler} type="email" id="email" placeholder="mark@mail.com" />
					<label htmlFor="password">Password:</label>
					<input onChange={this.passwordChangeHandler} type="password" id="password" placeholder="Min. 8 characters" />
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
