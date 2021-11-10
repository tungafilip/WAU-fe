import React, {Component} from 'react';
import './RegisterForm.scss';

type RegisterFormProps = {
	formSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
	fnameChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	lnameChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	emailChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	usernameChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	passwordChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	repasswordChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	radioChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	ageChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
	state: React.ComponentState;
}

let date = new Date();
let dd = String(date.getDate()).padStart(2, '0');
let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = date.getFullYear();
let dateString = yyyy+'-'+mm+'-'+dd;

class RegisterForm extends Component<RegisterFormProps> {

	render() {
		return (
			<div>
				<form onSubmit={this.props.formSubmitHandler} className="RegisterForm">
					<label htmlFor="fname">First name:</label>
					<input onChange={this.props.fnameChangeHandler} type="text" id="fname" placeholder="Mark" />
					<label htmlFor="lname">Last name:</label>
					<input onChange={this.props.lnameChangeHandler} type="text" id="lname" placeholder="Markus" />
					<label htmlFor="email">Email:</label>
					<input onChange={this.props.emailChangeHandler} className={this.props.state.emailError ? 'errorInput' : ''} type="email" id="email" placeholder="mark@mail.com" />
					<span className={this.props.state.emailError ? 'errorSpan' : ''}>{this.props.state.emailError}</span>
					<label htmlFor="username">Username:</label>
					<input onChange={this.props.usernameChangeHandler} className={this.props.state.usernameError ? 'errorInput' : ''} type="text" id="username" placeholder="markMarkus" />
					<span className={this.props.state.usernameError ? 'errorSpan' : ''}>{this.props.state.usernameError}</span>
					<label htmlFor="password">Password:</label>
					<input onChange={this.props.passwordChangeHandler} type="password" id="password" placeholder="Min. 8 characters" />
					<label htmlFor="password">Repeat password:</label>
					<input onChange={this.props.repasswordChangeHandler} type="password" id="repassword" placeholder="Passwords must match" />
					<label>Gender:</label>
					<div className="radioButtons" onChange={this.props.radioChangeHandler}>
						<input type="radio" name="gender" value="male" id="male" />
						<label htmlFor="male">Male</label>
						<input type="radio" name="gender" value="female" id="female" />
						<label htmlFor="female">Female</label>
					</div>
					<label htmlFor="password">Birthday:</label>
					<div className='birthday'>
						<input onChange={this.props.dayChangeHandler} className={this.props.state.dayError ? 'errorInput' : ''} type="number" min="1" max="31" id="age" placeholder="Min. 13" />
					</div>
					<input type="date" max={dateString} />
					<input onChange={this.props.ageChangeHandler} className={this.props.state.ageError ? 'errorInput' : ''} type="number" min="18" max="150" id="age" placeholder="Min. 13" />
					<span className={this.props.state.ageError ? 'errorSpan' : ''}>{this.props.state.ageError}</span>
					<input type="submit" value="Register" />
				</form>
			</div>
		);
	}
}

export default RegisterForm;
