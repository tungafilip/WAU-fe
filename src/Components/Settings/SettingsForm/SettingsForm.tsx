import React from 'react';

import './SettingsForm.scss';

type SettingsFormProps = {

}

const SettingsForm = (props : SettingsFormProps) => (
        <form className="SettingsForm">
            <div className="fullName">
                <div className="firstName">
                    <label htmlFor="fname">Change first name:</label>
                    <input type="text" name="fname" id="fname"/>
                </div>
                <div className="lastName">
                    <label htmlFor="fname">Change last name:</label>
                    <input type="text" name="lname" id="lname"/>
                </div>
            </div>
            <label htmlFor="username">Change username:</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="email">Change email:</label>
            <input type="text" name="email" id="email"/>
            <label htmlFor="email">Change birthday:</label>
            <input type="date" name="birthday" id="birthday"/>
            <label>Change gender:</label>
            <div className="radioButtons">
                <input type="radio" name="gender" value="male" id="male" />
                <label htmlFor="male">Male</label>
                <input type="radio" name="gender" value="female" id="female" />
                <label htmlFor="female">Female</label>
            </div>
        </form>
);

export default SettingsForm;
