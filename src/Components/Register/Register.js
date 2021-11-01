import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import './Register.scss';
import axios from "axios";
import RegisterForm from "./RegisterForm/RegisterForm";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			fname: '',
			lname: '',
			email: '',
			username: '',
			password: '',
			repassword: '',
			gender: '',
			age: '',
			emailError: '',
			usernameError: '',
			ageError: '',
		}
	}

	// Input Change Handlers
	fnameChangeHandler = (event) => {
		this.setState({fname: event.target.value});
	}
	lnameChangeHandler = (event) => {
		this.setState({lname: event.target.value});
	}
	emailChangeHandler = (event) => {
		this.setState({email: event.target.value});
	}
	usernameChangeHandler = (event) => {
		this.setState({username: event.target.value});
	}
	passwordChangeHandler = (event) => {
		this.setState({password: event.target.value});
	}
	repasswordChangeHandler = (event) => {
		this.setState({repassword: event.target.value});
	}
	radioChangeHandler = (event) => {
		this.setState({gender: event.target.value});
	}
	ageChangeHandler = (event) => {
		if (event.target.value < 18 || event.target.value > 70) {
			this.setState({ageError: 'You need to be older than 18 and younger than 70 years.'});
		} else {
			this.setState({ageError: ''});
			this.setState({age: event.target.value});
		}
	}

	// Form Submit Handler
	formSubmitHandler = (event) => {
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
				if (response.data.usernameError != null) {
					this.setState({emailError: response.data.emailError})
					error = true;
				}
				if (response.data.usernameError != null) {
					this.setState({usernameError: response.data.usernameError})
					error = true;
					console.log(this.state.usernameError);
				}
				if (this.state.age < 18 || this.state.age > 70) {
					error = true;
					this.setState({ageError: 'You need to be older than 18 and younger than 70 years.'});
				}
				if (response.data.ageError != null) {
					error = true;
					this.setState({ageError: response.data.ageError});
				}
				if (!error) {
					this.props.history.push('/');
				}
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
					passwordChangeHandler={this.fnameChangeHandler}
					repasswordChangeHandler={this.fnameChangeHandler}
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
