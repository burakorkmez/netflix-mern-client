// styles
import './modal.scss';
import YouTube from 'react-youtube';
import { ArrowBackIos, ArrowForwardIos, Close } from '@material-ui/icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useModalContext } from '../../context/modalContext/ModalContext';

const Modal = ({ id }) => {
	const [trailers, setTrailers] = useState([]);
	const [currentTrailer, setCurrentTrailer] = useState(0);
	const { isModalOpen, dispatch } = useModalContext();

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
	}, []);

	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				dispatch({ type: 'CLOSE_MODAL' });
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

	const handleClick = () => {
		dispatch({ type: 'CLOSE_MODAL' });
	};

	const handleTrailer = (e, type) => {
		e.stopPropagation();
		if (type === 'NEXT') setCurrentTrailer((prev) => prev + 1);
		if (type === 'PREV') setCurrentTrailer((prev) => prev - 1);
	};

	return (
		<div className="modal-bg" onClick={handleClick}>
			<div className="close-btn" onClick={handleClick}>
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
								onClick={(e) => handleTrailer(e, 'PREV')}
							>
								<ArrowBackIos className="trailer-icon" /> Previous Trailer
							</span>
						)}
						<span className="active-trailer">{currentTrailer + 1}</span>
						<span>/{trailers.length}</span>
						{currentTrailer !== trailers.length - 1 && (
							<span
								className="trailer-icon-wrapper"
								onClick={(e) => handleTrailer(e, 'NEXT')}
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
