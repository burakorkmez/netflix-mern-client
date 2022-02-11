import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import InfoModal from '../../components/modal/InfoModal';
import Navbar from '../../components/navbar/Navbar';
import { useModalContext } from '../../context/modalContext/ModalContext';
import { genresMovie, genresSeries } from '../../helpers/genres';
import MoviesGridItem from './MoviesGridItem';

import './movies.scss';
import { ArrowBack } from '@material-ui/icons';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState(null);
	const [expandedMovieData, setExpandedMovieData] = useState([]);
	const [duration, setDuration] = useState(null);
	const [page, setPage] = useState(1);

	const { pathname } = useLocation();

	const isMovie = pathname.startsWith('/movies');

	const { isInfoModalOpen } = useModalContext();

	const { movieOrSeries, genre } = useParams();

	const searchedGenre = isMovie
		? genresMovie.find((g) => g.name.toLowerCase() === genre.toLowerCase())
		: genresSeries.find((g) => g.name.toLowerCase() === genre.toLowerCase());

	const formattedUrl = movieOrSeries === 'movies' ? 'movie' : 'tv';

	// add open-modal class to body
	const addBodyClass = (className) => document.body.classList.add(className);
	const removeBodyClass = (className) =>
		document.body.classList.remove(className);

	useEffect(() => {
		const getMovies = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/discover/${formattedUrl}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&&page=${page}&with_genres=${searchedGenre.id}#`
			);
			setMovies((prev) => [...prev, ...res.data.results]);
		};
		getMovies();
	}, [searchedGenre?.id, page, formattedUrl]);
	console.log(movie);

	const increasePageNum = (e) => {
		// check if scrolled to the bottom of the page

		if (
			window.innerHeight + e.target.documentElement.scrollTop + 1 >=
			e.target.documentElement.scrollHeight
		) {
			setPage((prev) => prev + 1);
		}
	};
	console.log(page);

	useEffect(() => {
		// set up
		if (isInfoModalOpen) {
			addBodyClass('modal-open');

			// Clean up
			return () => {
				removeBodyClass('modal-open');
			};
		}
	}, [isInfoModalOpen]);

	useEffect(() => {
		// set up
		window.addEventListener('scroll', increasePageNum);

		// clean up
		return () => window.removeEventListener('scroll', increasePageNum);
	}, []);

	const handleSetMovie = (movie, duration, expandedMovieData) => {
		setMovie(movie);
		setDuration(duration);
		setExpandedMovieData(expandedMovieData);
	};

	return (
		<>
			<Navbar />

			<div className="movies-page">
				<div className="container genre-title">
					<Link to={`/${movieOrSeries}`}>
						<ArrowBack className="back-icon" />
					</Link>
					<h1>
						{genre.charAt(0).toUpperCase() + genre.slice(1)}{' '}
						{movieOrSeries.charAt(0).toUpperCase() + movieOrSeries.slice(1)}
					</h1>
				</div>
				<div className="container grid">
					{movies.map((movie) => (
						<>
							<MoviesGridItem
								movie={movie}
								handleSetMovie={handleSetMovie}
								key={movie.id}
							/>
						</>
					))}
				</div>
				{isInfoModalOpen && (
					<InfoModal
						movie={movie}
						duration={duration}
						expandedMovieData={expandedMovieData}
					/>
				)}
			</div>
		</>
	);
};

export default Movies;
