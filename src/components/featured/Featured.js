import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { formatDuration } from '../../functions/formatDuration';
import { genresMovie, genresSeries } from '../../helpers/genres';
import './featured.scss';
import Modal from '../modal/Modal';
import { useModalContext } from '../../context/modalContext/ModalContext';
import axios from 'axios';

export default function Featured({ type, handleChange }) {
	const [content, setContent] = useState(null);
	const [duration, setDuration] = useState(null);
	const [numberOfSeasons, setNumberOfSeasons] = useState(null);
	const [genres, setGenres] = useState(
		type === 'movie' ? genresMovie : genresSeries
	);

	const { isYoutubeModalOpen, dispatch } = useModalContext();
	const moviesOrSeries = type === 'movie' ? 'movie' : 'tv';

	const randomNumberForMovie = Math.floor(Math.random() * 19);
	const randomNumberForPage = Math.floor(Math.random() * 3) + 1;

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(
					`https://api.themoviedb.org/3/${moviesOrSeries}/popular?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&page=${randomNumberForPage}`
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
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [moviesOrSeries]);

	console.log(content);

	// get genres of featured movie/series
	const genresOfMovie = [];
	content?.genre_ids.forEach((id, i) => {
		genres.forEach((genre) => {
			if (id === genre.id) {
				genresOfMovie.push(genre.name);
			}
		});
	});
	{
		/* {moviesOrSeries !== 'movie' &&
	content?.genre_ids.map((genre, i) => (
		<>
			<span>
				{genre}
				{i !== genresOfMovie.length - 1 && ', '}
			</span>
		</>
	))} */
	}

	return (
		<>
			<div className="featured">
				{type && (
					<div className="category">
						<span>{type === 'movie' ? 'Movies' : 'Series'}</span>
						<select
							name="genre"
							id="genre"
							onChange={(e) => handleChange(e.target.value)}
						>
							<option value="">Genre</option>
							<option value="Action">Action</option>
							<option value="Comedy">Comedy</option>
							<option value="crime">Crime</option>
						</select>
					</div>
				)}
				<img
					src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
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
								<>
									<span>
										{genre}
										{i !== genresOfMovie.length - 1 && ', '}
									</span>
								</>
							))}
						</span>
						<span className="duration">
							{moviesOrSeries === 'movie'
								? formatDuration(duration)
								: numberOfSeasons + ' Season'}
							{numberOfSeasons !== 1 && 's'}
						</span>
					</div>
					<div className="buttons">
						<button
							className="play"
							onClick={() => dispatch({ type: 'OPEN_YOUTUBE_MODAL' })}
						>
							<PlayArrow />
							<span>Play</span>
						</button>
						<button className="more">
							<InfoOutlined />
							<span>Info</span>
						</button>
					</div>
				</div>
			</div>
			{isYoutubeModalOpen && (
				<Modal id={content?.id} moviesOrSeries={moviesOrSeries} />
			)}
		</>
	);
}
