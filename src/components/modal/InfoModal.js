import { AddCircleOutline, Close, PlayArrow } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useModalContext } from '../../context/modalContext/ModalContext';
import { formatDuration } from '../../functions/formatDuration';
import getGenresOfMovie from '../../functions/getGenresOfMovie';
import SimilarTitles from '../similarTitles/SimilarTitles';
import './infoModal.scss';
import Modal from './Modal';

const InfoModal = ({ movie, duration, expandedMovieData }) => {
	const genresOfMovie = getGenresOfMovie(movie);
	const [similarTitleTrailer, setSimilarTitleTrailer] = useState(null);
	const { dispatch, isYoutubeModalOpen } = useModalContext();
	const { movieOrSeries } = useParams();

	const { pathname } = useLocation();
	const isMovie = pathname.startsWith('/movies') && true;

	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				dispatch({ type: 'CLOSE_INFO_MODAL' });
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

	const handleClick = () => {
		dispatch({ type: 'OPEN_YOUTUBE_MODAL' });
		setSimilarTitleTrailer(null);
	};

	const handleSimilarTitleTrailer = (id) => {
		setSimilarTitleTrailer(id);
	};

	return (
		<div
			className="info-modal"
			onClick={() => dispatch({ type: 'CLOSE_INFO_MODAL' })}
		>
			{isYoutubeModalOpen && (
				<Modal
					id={similarTitleTrailer ? similarTitleTrailer : expandedMovieData.id}
				/>
			)}

			<div className="container" onClick={(e) => e.stopPropagation()}>
				<div
					className="close-btn"
					onClick={() => dispatch({ type: 'CLOSE_INFO_MODAL' })}
				>
					<Close className="icon" />
				</div>
				<div class="img-wrapper">
					<div class="img-overlay"></div>
					<img
						src={`https://image.tmdb.org/t/p/original/${expandedMovieData.backdrop_path}`}
						alt=""
					/>
					<div className="movie-info">
						<h1 className="movie-title">
							{isMovie
								? expandedMovieData.original_title
								: expandedMovieData.original_name}
						</h1>
						<div className="movie-btn-wrapper">
							<button className="play" onClick={handleClick}>
								<PlayArrow />
								<span>Play</span>
							</button>
							<AddCircleOutline className="icon" />
						</div>
					</div>
				</div>

				<div className="container movie-info-overview">
					<div className="movie-info-grid">
						<div className="movie-info-grid-overview">
							<div className="flex">
								<p className="rating">
									{' '}
									Rating: {expandedMovieData.vote_average}/10
								</p>
								<p className="year">
									{isMovie && new Date(movie.release_date).getFullYear()}
									{!isMovie && new Date(movie.first_air_date).getFullYear()}
								</p>
								<p className="lang">
									{expandedMovieData.original_language.toUpperCase()}
								</p>
								<p className="duration">
									{isMovie && formatDuration(duration)}
									{!isMovie && expandedMovieData.seasons.length + ' Season'}
									{!isMovie && expandedMovieData.seasons.length > 1 && 's'}
								</p>
							</div>
							<p className="desc">{expandedMovieData.overview}</p>
						</div>
						<div>
							<p className="movie-info-grid-genres">
								<div>
									<span>Genres: </span>
									{genresOfMovie.map((genre, i) => (
										<b className="genre-name">{genre} </b>
									))}
								</div>
								<div>
									<span>Casts: </span>
									{expandedMovieData.credits.cast.slice(0, 4).map((cast, i) => (
										<b className="cast-name">{cast.name}</b>
									))}
									<a href="#about" className="link-more">
										More
									</a>
								</div>
							</p>
						</div>
					</div>
				</div>
				<SimilarTitles
					movie={movie}
					handleSimilarTitleTrailer={handleSimilarTitleTrailer}
					expandedMovieData={expandedMovieData}
				/>
			</div>
		</div>
	);
};

export default InfoModal;
