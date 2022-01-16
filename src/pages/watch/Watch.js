import { ArrowBackOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './watch.scss';

export default function Watch() {
	return (
		<div className="watch">
			<Link to="/">
				<div className="back">
					<ArrowBackOutlined />
					Home
				</div>
			</Link>
			<video
				className="video"
				autoPlay
				progress
				controls
				src="https://player.vimeo.com/external/507558892.sd.mp4?s=831a8939134d7c72cd4b0691c9a4ec85e02dfb15&profile_id=165&oauth2_token_id=57447761"
			/>
		</div>
	);
}
