import React, {Component, useEffect} from 'react';
// @ts-ignore
import {withRouter} from "react-router-dom";
import './Register.scss';
import axios, {AxiosResponse} from "axios";
import RegisterForm from "./RegisterForm/RegisterForm";
import Cookies from "universal-cookie/es6";
import {object} from "prop-types";

const cookie = new Cookies();

type registerProps = {
	history: any;
	enableLoading: (value: boolean) => void;
}
type registerState = {
	fname: string;
	lname: string;
	email: string;
	username: string;
	password: string;
	repassword: string;
	gender: string;
	age: number;
	emailError: string;
	usernameError: string;
	ageError: string;
}

class Register extends Component<registerProps, registerState> {
	componentDidMount() {
		if (cookie.get('user-api-key')) {
			axios.post('https://localhost:8000/api/get/user/by/api', {
				apiKey: cookie.get('user-api-key')
			}).then((response: AxiosResponse) => {
				// @ts-ignore
				if (response.data.delete) {
					cookie.remove('user-api-key');
				} else {
					this.props.history.push('/');
				}
			}).catch((error) => {
				console.log(error);
			})
		}
	}

	state : registerState = {
		fname: '',
		lname: '',
		email: '',
		username: '',
		password: '',
		repassword: '',
		gender: '',
		age: 0,
		emailError: '',
		usernameError: '',
		ageError: '',
	}

	// Input Change Handlers
	fnameChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({fname: target.value});
	}
	lnameChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({lname: target.value});
	}
	emailChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({email: target.value});
	}
	usernameChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({username: target.value});
	}
	passwordChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({password: target.value});
	}
	repasswordChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({repassword: target.value});
	}
	radioChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		this.setState({gender: target.value});
	}
	ageChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (parseInt(target.value) < 18 || parseInt(target.value) > 70) {
			this.setState({ageError: 'You need to be older than 18 and younger than 70 years.'});
		} else {
			this.setState({ageError: ''});
			this.setState({age: parseInt(target.value)});
		}
	}

	// Form Submit Handler
	formSubmitHandler = (event : React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.props.enableLoading(true);
		let password = this.state.password;
		let repassword = this.state.repassword;

		if (password === repassword) {
			axios.post('https://localhost:8000/api/register', {
				fname: this.state.fname,
				lname: this.state.lname,
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
				gender: this.state.gender,
				age: this.state.age,
			}).then((response) => {
				let error = false;
				// @ts-ignore
				if (response.data.usernameError != null) {
					// @ts-ignore
					this.setState({emailError: response.data.emailError})
					error = true;
				}
				// @ts-ignore
				if (response.data.usernameError != null) {
					// @ts-ignore
					this.setState({usernameError: response.data.usernameError})
					error = true;
					console.log(this.state.usernameError);
				}
				if (this.state.age < 18 || this.state.age > 70) {
					error = true;
					this.setState({ageError: 'You need to be older than 18 and younger than 70 years.'});
				}
				// @ts-ignore
				if (response.data.ageError != null) {
					error = true;
					// @ts-ignore
					this.setState({ageError: response.data.ageError});
				}
				if (!error) {
					this.props.history.push('/');
				}
				console.log(response);
				this.props.enableLoading(false);
			}).catch((error) => {
				console.log(error);
			})
		}
	}

	render() {
		return (
			<div className="register">
				<RegisterForm
					fnameChangeHandler={this.fnameChangeHandler}
					lnameChangeHandler={this.lnameChangeHandler}
					emailChangeHandler={this.emailChangeHandler}
					usernameChangeHandler={this.usernameChangeHandler}
					passwordChangeHandler={this.passwordChangeHandler}
					repasswordChangeHandler={this.repasswordChangeHandler}
					radioChangeHandler={this.radioChangeHandler}
					ageChangeHandler={this.ageChangeHandler}
					formSubmitHandler={this.formSubmitHandler}
					state={this.state}
				/>
			</div>
		);
	}
}

export default withRouter(Register);
