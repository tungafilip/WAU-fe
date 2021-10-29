import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie/es6";

import './Login.scss';
import axios from "axios";
import Loading from "../Loading/Loading";

const cookie = new Cookies();

class Login extends Component {
	componentWillMount() {
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
			password: '',
			emailError: '',
			passwordError: '',
		}
	}

	emailChangeHandler = (event) => {
		let email = event.target.value;
		this.setState({email: email});
	}

	passwordChangeHandler = (event) => {
		let password = event.target.value;
		this.setState({password: password});
	}

	formSubmitHandler = (event) => {
		event.preventDefault();
		console.log('1');
		axios.post('https://localhost:8000/api/login', {
			email: this.state.email,
			password: this.state.password,
		}).then((response) => {
			if (response.data.emailError) {
				this.setState({passwordError: ''})
				this.setState({emailError: response.data.emailError})
			} else if (response.data.passwordError) {
				this.setState({emailError: ''});
				this.setState({passwordError: response.data.passwordError})
				console.log('password error');
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
					<input onChange={this.emailChangeHandler} type="email" id="email" placeholder="mark@mail.com" />
					<span className={this.state.emailError ? 'errorSpan' : ''}>{this.state.emailError}</span>
					<label htmlFor="password">Password:</label>
					<input onChange={this.passwordChangeHandler} type="password" id="password" placeholder="Min. 8 characters" />
					<span className={this.state.passwordError ? 'errorSpan' : ''}>{this.state.passwordError}</span>
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
