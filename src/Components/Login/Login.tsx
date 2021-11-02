import React, {useState, useEffect, MouseEventHandler} from 'react';
// @ts-ignore
import { withRouter, useHistory } from 'react-router-dom';
import Cookies from "universal-cookie/es6";

import './Login.scss';
import axios from "axios";

type LoginProps = {
	enableLoading: (value: boolean) => void;
}

const Login = (props : LoginProps) => {
	const cookie = new Cookies();
	const history = useHistory();

	// Similar to componentDidMount and componentDidUpdate
	useEffect(() => {
		if (cookie.get('user-api-key')) {
			axios.post('https://localhost:8000/api/get/user/by/api', {
				apiKey: cookie.get('user-api-key')
			}).then((response) => {
				// @ts-ignore
				if (response.data.delete) {
					// @ts-ignore
					console.log(response.data.delete);
					cookie.remove('user-api-key');
				} else {
					history.push('/');
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

	const emailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		let email = target.value;
		setEmail(email);
	}

	const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		let password = target.value;
		setPassword(password);
	}

	const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.enableLoading(true);
		axios.post('https://localhost:8000/api/login', {
			email: email,
			password: password,
		}).then((response) => {
			// @ts-ignore
			if (response.data.emailError) {
				setPasswordError('');
				// @ts-ignore
				setEmailError(response.data.emailError);
				props.enableLoading(false);
				// @ts-ignore
			} else if (response.data.passwordError) {
				setEmailError('');
				// @ts-ignore
				setPasswordError(response.data.passwordError);
				props.enableLoading(false);
				// @ts-ignore
			} else if (response.data.userApiKey) {
				// @ts-ignore
				cookie.set('user-api-key', response.data.userApiKey);
				props.enableLoading(false);
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
