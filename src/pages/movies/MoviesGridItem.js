import {
	AddCircleOutlineOutlined,
	InfoOutlined,
	PlayCircleFilledWhiteOutlined,
} from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useModalContext } from '../../context/modalContext/ModalContext';
import { formatDuration } from '../../functions/formatDuration';
import { genresMovie } from '../../helpers/genres';

const MoviesGridItem = ({ movie }) => {
	const [duration, setDuration] = useState(null);
	const { dispatch } = useModalContext();

	useEffect(() => {
		const getDuration = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US`
			);
			console.log(res);
			setDuration(res.data.runtime);
		};
		getDuration();
	}, [movie.id]);

	// get genres of featured movie/series
	const genresOfMovie = [];
	movie?.genre_ids.forEach((id, i) => {
		genresMovie.forEach((genre) => {
			if (id === genre.id) {
				genresOfMovie.push(genre.name);
			}
		});
	});

	const handleClick = () => {
		dispatch({ type: 'OPEN_INFO_MODAL' });
		console.log('clicked');
	};
	return (
		<>
			<div className="grid-item">
				<div className="video-player-icon">
					<PlayCircleFilledWhiteOutlined className="icon" />
				</div>
				<img
					src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
					alt={movie.title + ' image'}
				/>
				<div className="grid-item-info">
					<div className="grid-item-info-header">
						<div>
							<span className="grid-item-title">
								{movie.original_title.length < 20
									? movie.original_title
									: movie.original_title.substring(0, 25) + '...'}
							</span>
							<span className="grid-item-language">
								{' '}
								{movie.original_language.toUpperCase()}
							</span>
						</div>
						<div className="grid-item-icons">
							<InfoOutlined onClick={handleClick} className="icon" />
							<AddCircleOutlineOutlined className="icon" />
						</div>
					</div>

					{genresOfMovie.map((genre, i) => (
						<span className="grid-item-genres">
							{genre}
							{i !== genresOfMovie.length - 1 && ', '}
						</span>
					))}
					<div className="grid-item-bottom">
						<div>
							<span className="grid-item-rating">
								{' '}
								Rating: {movie.vote_average}/10
							</span>{' '}
							<span className="grid-item-votes">{movie.vote_count} votes</span>
						</div>
						<div>{formatDuration(duration)}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MoviesGridItem;
