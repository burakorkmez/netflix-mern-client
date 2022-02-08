import { ArrowBack } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoModal from '../../components/modal/InfoModal';
import Navbar from '../../components/navbar/Navbar';
import { useModalContext } from '../../context/modalContext/ModalContext';
import { genresMovie } from '../../helpers/genres';
import './movies.scss';
import MoviesGridItem from './MoviesGridItem';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState(null);
	const [duration, setDuration] = useState(null);
	const { genre } = useParams();
	const { isInfoModalOpen } = useModalContext();

	const searchedGenre = genresMovie.find(
		(g) => g.name.toLowerCase() === genre.toLowerCase()
	);

	useEffect(() => {
		const getMovies = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&with_genres=${searchedGenre.id}#`
			);
			setMovies(res.data.results);
		};
		getMovies();
	}, []);

	const handleSetMovie = (movie, duration) => {
		setMovie(movie);
		setDuration(duration);
	};

	return (
		<>
			<Navbar />

			<div className="movies-page">
				<div className="container genre-title">
					<ArrowBack className="back-icon" />
					<h1>Adventure Movies</h1>
				</div>
				<div className="container grid">
					{movies.map((movie) => (
						<>
							<MoviesGridItem movie={movie} handleSetMovie={handleSetMovie} />
						</>
					))}
				</div>
				{isInfoModalOpen && <InfoModal movie={movie} duration={duration} />}
			</div>
		</>
	);
};

export default Movies;
