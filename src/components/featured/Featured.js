import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { formatDuration } from '../../functions/formatDuration';
import { genres } from '../../helpers/genres';
import './featured.scss';
import Modal from '../modal/Modal';
import { useModalContext } from '../../context/modalContext/ModalContext';

export default function Featured({ type, handleChange }) {
	const [content, setContent] = useState(null);
	const [duration, setDuration] = useState(null);

	const { isModalOpen, dispatch } = useModalContext();

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US`
				);
				const data = await res.json();
				const randomNumber = Math.floor(Math.random() * (19 + 1));
				setContent(data.results[randomNumber]);

				const resDuration = await fetch(
					`https://api.themoviedb.org/3/movie/${data.results[randomNumber].id}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US`
				);
				const durationData = await resDuration.json();
				setDuration(durationData.runtime);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, []);

	// get genres of featured movie
	const genresOfMovie = [];
	content?.genre_ids.forEach((id, i) => {
		genres.forEach((genre) => {
			if (id === genre.id) {
				genresOfMovie.push(genre.name);
			}
		});
	});

	const handleClick = () => {
		dispatch({ type: 'OPEN_MODAL' });
	};

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
					<h1>{content?.title}</h1>
					<span className="desc">{content?.overview}</span>
					<div className="info-year-wrapper">
						<span className="year">
							{new Date(content?.release_date).getFullYear()}
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
						<span className="duration">{formatDuration(duration)}</span>
					</div>
					<div className="buttons">
						<button className="play" onClick={handleClick}>
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
			{isModalOpen && <Modal id={content?.id} />}
		</>
	);
}
