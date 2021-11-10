import React from 'react';
import SettingsForm from "./SettingsForm/SettingsForm";

type SettingsProps = {

}

const Settings = (props : SettingsProps) => {
	return (
		<div className="Settings">
			<SettingsForm />
		</div>
	);
}

export default Settings;
