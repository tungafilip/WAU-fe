import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie/es6";
import { useDispatch } from "react-redux";
import { enable, disable } from "../../Redux/loading";

import './Login.scss';
import axios from "axios";

const cookie = new Cookies();

const Login = () => {

	// Similar to componentDidMount and componentDidUpdate
	useEffect(() => {
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
	})

	// State
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const emailChangeHandler = (event) => {
		let email = event.target.value;
		this.setState({email: email});
	}

	const passwordChangeHandler = (event) => {
		let password = event.target.value;
		this.setState({password: password});
	}

	const formSubmitHandler = (event) => {
		event.preventDefault();
		axios.post('https://localhost:8000/api/login', {
			email: email,
			password: password,

		}).then((response) => {
			if (response.data.emailError) {
				setPasswordError('');
				setEmailError(response.data.emailError);
			} else if (response.data.passwordError) {
				setEmailError('');
				setPasswordError(response.data.passwordError)
			} else if (response.data.userApiKey) {
				cookie.set('user-api-key', response.data.userApiKey);
				history.push('/');
			}
		}).catch((error) => {
			console.log(error.response.data);
		})
	}
	
	return (
		<div className='login'>
			<form onSubmit={formSubmitHandler}>
				<label htmlFor="email">Email:</label>
				<input onChange={emailChangeHandler} type="email" id="email" placeholder="mark@mail.com" />
				<span className={emailError ? 'errorSpan' : ''}>{emailError}</span>
				<label htmlFor="password">Password:</label>
				<input onChange={passwordChangeHandler} type="password" id="password" placeholder="Min. 8 characters" />
				<span className={passwordError ? 'errorSpan' : ''}>{passwordError}</span>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}

export default withRouter(Login);
