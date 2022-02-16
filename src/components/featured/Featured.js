import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { formatDuration } from '../../functions/formatDuration';
import { genresMovie, genresSeries } from '../../helpers/genres';
import './featured.scss';
import Modal from '../modal/Modal';
import { useModalContext } from '../../context/modalContext/ModalContext';
import axios from 'axios';
import SkeletonImage from '../skeletons/SkeletonImage';

export default function Featured({
	type,
	handleChange,
	handleInfoModal,
	trailerKey,
	setTrailerKey,
	isFeaturedTrailerClosed,
	setIsFeaturedTrailerClosed,
	isListItemTrailerClosed,
	setIsListItemTrailerClosed,
}) {
	const [content, setContent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [duration, setDuration] = useState(null);
	const [numberOfSeasons, setNumberOfSeasons] = useState(null);
	const [genres, setGenres] = useState(
		type === 'movie' ? genresMovie : genresSeries
	);

	const { isYoutubeModalOpen, dispatch, isInfoModalOpen } = useModalContext();
	const moviesOrSeries = type === 'movie' ? 'movie' : 'tv';

	useEffect(() => {
		setIsLoading(true);
		const getRandomContent = async () => {
			try {
				const randomNumberForMovie = Math.floor(Math.random() * 19);
				const res = await axios.get(
					`https://api.themoviedb.org/3/${moviesOrSeries}/popular?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&`
				);
				setContent(res.data.results[randomNumberForMovie]);
				if (moviesOrSeries === 'movie') {
					const resDuration = await axios.get(
						`https://api.themoviedb.org/3/${moviesOrSeries}/${res.data.results[randomNumberForMovie].id}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US`
					);
					setDuration(resDuration.data.runtime);
				} else {
					const resSeasonNumb = await axios.get(
						`https://api.themoviedb.org/3/${moviesOrSeries}/${res.data.results[randomNumberForMovie].id}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US`
					);
					setNumberOfSeasons(resSeasonNumb.data.number_of_seasons);
				}
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				console.log(err);
			}
		};
		getRandomContent();
	}, [moviesOrSeries]);

	// get genres of featured movie/series
	const genresOfMovie = [];
	content?.genre_ids.forEach((id, i) => {
		genres.forEach((genre) => {
			if (id === genre.id) {
				genresOfMovie.push(genre.name);
			}
		});
	});

	const handlePlayTrailer = () => {
		setTrailerKey(null);
		setIsFeaturedTrailerClosed(false);
		dispatch({ type: 'OPEN_YOUTUBE_MODAL' });
	};
	const handleInfoClick = () => {
		dispatch({ type: 'OPEN_INFO_MODAL' });
		handleInfoModal(content);
	};
	if (isLoading) return <SkeletonImage featured={true} />;

	return (
		<>
			<div className="featured">
				<img
					src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`}
					className="featuredImg"
					alt=""
				/>
				<div className="info">
					<h1>
						{moviesOrSeries === 'movie'
							? content?.original_title
							: content?.original_name}
					</h1>
					<span className="desc">{content?.overview}</span>
					<div className="info-year-wrapper">
						<span className="year">
							{new Date(
								moviesOrSeries === 'movie'
									? content?.release_date
									: content?.first_air_date
							).getFullYear()}
						</span>
						<span className="genre">
							{genresOfMovie.map((genre, i) => (
								<span key={i}>
									{genre}
									{i !== genresOfMovie.length - 1 && ', '}
								</span>
							))}
						</span>
						<span className="duration">
							{moviesOrSeries === 'movie'
								? formatDuration(duration)
								: numberOfSeasons + ' Season'}
							{moviesOrSeries !== 'movie' && numberOfSeasons !== 1 && 's'}
						</span>
					</div>
					<div className="buttons">
						<button className="play" onClick={handlePlayTrailer}>
							<PlayArrow />
							<span>Play</span>
						</button>
						<button className="more" onClick={handleInfoClick}>
							<InfoOutlined />
							<span>Info</span>
						</button>
					</div>
				</div>
			</div>
			{isYoutubeModalOpen && !isFeaturedTrailerClosed && (
				<Modal
					id={trailerKey ? trailerKey : content?.id}
					moviesOrSeries={moviesOrSeries}
					setIsFeaturedTrailerClosed={setIsFeaturedTrailerClosed}
				/>
			)}
			{isYoutubeModalOpen && !isListItemTrailerClosed && (
				<Modal
					id={trailerKey ? trailerKey : content?.id}
					moviesOrSeries={moviesOrSeries}
					setIsListItemTrailerClosed={setIsListItemTrailerClosed}
				/>
			)}
			{/* {isInfoModalOpen && (
				<InfoModal duration={duration} expandedMovieData={content} />
			)} */}
		</>
	);
}
