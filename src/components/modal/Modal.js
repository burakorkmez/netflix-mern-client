// styles
import './modal.scss';
import YouTube from 'react-youtube';
import { ArrowBackIos, ArrowForwardIos, Close } from '@material-ui/icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Modal = ({ id }) => {
	const [trailers, setTrailers] = useState([]);
	const [currentTrailer, setCurrentTrailer] = useState(1);

	const opts = {
		height: '550',
		width: '1100',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	useEffect(() => {
		const getTrailers = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US`
			);
			console.log(res.data);
			setTrailers(res.data.results);
		};
		getTrailers();
	}, [id]);

	return (
		<div className="modal-bg">
			<div className="close-btn">
				<Close />{' '}
			</div>
			<div className="modal-container">
				<div className="trailers">
					<div className="trailers-left">
						<span className="trailers-title">Trailers</span>
						<span className="add-to-fav">+</span>
					</div>
					<div className="trailers-right">
						{currentTrailer !== 0 && (
							<span
								className="trailer-icon-wrapper"
								onClick={() => setCurrentTrailer((prev) => prev - 1)}
							>
								<ArrowBackIos className="trailer-icon" /> Previous Trailer
							</span>
						)}
						<span className="active-trailer">{currentTrailer + 1}</span>
						<span>/{trailers.length}</span>
						{currentTrailer !== trailers.length - 1 && (
							<span
								className="trailer-icon-wrapper"
								onClick={() => setCurrentTrailer((prev) => prev + 1)}
							>
								Next Trailer <ArrowForwardIos className="trailer-icon" />{' '}
							</span>
						)}
					</div>
				</div>
				{
					<YouTube
						className="trailer-video"
						videoId={trailers[currentTrailer]?.key}
						opts={opts}
					/>
				}
			</div>
		</div>
	);
};

export default Modal;
