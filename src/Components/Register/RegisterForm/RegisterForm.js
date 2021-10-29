import React, {Component} from 'react';
import './RegisterForm.scss';

class RegisterForm extends Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.formSubmitHandler}>
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
					<label htmlFor="password">Age:</label>
					<input onChange={this.props.ageChangeHandler} className={this.props.state.ageError ? 'errorInput' : ''} type="number" min="18" max="150" id="age" placeholder="Min. 13" />
					<span className={this.props.state.ageError ? 'errorSpan' : ''}>{this.props.state.ageError}</span>
					<input type="submit" value="Register" />
				</form>
			</div>
		);
	}
}

export default RegisterForm;
