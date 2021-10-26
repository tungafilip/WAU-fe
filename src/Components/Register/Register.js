import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import './Register.scss';
import axios from "axios";

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
			age: ''
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
		this.setState({age: event.target.value});
	}

	formSubmitHandler = (event) => {
		event.preventDefault();
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
				// this.props.history.push('/');
				console.log('ss');
				console.log(response.data);
			}).catch((error) => {
				console.log(error);
			})
		}
	}

	render() {
		return (
			<div className="register">
				<form onSubmit={this.formSubmitHandler}>
					<label htmlFor="fname">First name:</label>
					<input onChange={this.fnameChangeHandler} type="text" id="fname" placeholder="Mark" />
					<label htmlFor="lname">Last name:</label>
					<input onChange={this.lnameChangeHandler} type="text" id="lname" placeholder="Markus" />
					<label htmlFor="email">Email:</label>
					<input onChange={this.emailChangeHandler} type="email" id="email" placeholder="mark@mail.com" />
					<label htmlFor="username">Username:</label>
					<input onChange={this.usernameChangeHandler} type="text" id="username" placeholder="markMarkus" />
					<label htmlFor="password">Password:</label>
					<input onChange={this.passwordChangeHandler} type="password" id="password" placeholder="Min. 8 characters" />
					<label htmlFor="password">Repeat password:</label>
					<input onChange={this.repasswordChangeHandler} type="password" id="repassword" placeholder="Passwords must match" />
					<label>Gender:</label>
					<div className="radioButtons" onChange={this.radioChangeHandler}>
						<input type="radio" name="gender" value="male" id="male" />
						<label htmlFor="male">Male</label>
						<input type="radio" name="gender" value="female" id="female" />
						<label htmlFor="female">Female</label>
					</div>
					<label htmlFor="password">Age:</label>
					<input onChange={this.ageChangeHandler} type="number" min="13" max="150" id="age" placeholder="Min. 13" />
					<input type="submit" value="Register" />
				</form>
			</div>
		);
	}
}

export default withRouter(Register);
