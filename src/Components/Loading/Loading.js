import React, {Component} from 'react';
import './Loading.scss';
import LoadingHeart from '../../Assets/images/loading/loading_heart.gif';

class Loading extends Component {
	render() {
		return (
			<div className="loading">
				<img alt="Loading Heart" src={LoadingHeart} />
			</div>
		);
	}
}

export default Loading;
