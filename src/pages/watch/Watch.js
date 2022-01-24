import { ArrowBackOutlined } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './watch.scss';

export default function Watch() {
	const location = useLocation();

	return (
		<div className="watch">
			<Link to="/">
				<div className="back">
					<ArrowBackOutlined />
					Home
				</div>
			</Link>

			<video className="video" autoPlay progress controls>
				<source src="./assets/video/movie.mp4" type="video/mp4" />
			</video>
		</div>
	);
}
