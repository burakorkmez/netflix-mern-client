import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import InfoModal from '../../components/modal/InfoModal';
import Navbar from '../../components/navbar/Navbar';
import { useModalContext } from '../../context/modalContext/ModalContext';
import { genresMovie, genresSeries } from '../../helpers/genres';
import './home.scss';

const Home = ({ type, handleChange }) => {
	const [genres, setGenres] = useState([]);
	const [trailerKey, setTrailerKey] = useState(null);
	const [movie, setMovie] = useState(null);
	const [expandedMovieData, setExpandedMovieData] = useState(null);

	const [isFeaturedTrailerClosed, setIsFeaturedTrailerClosed] = useState(true);
	const [isListItemTrailerClosed, setIsListItemTrailerClosed] = useState(true);

	const { isInfoModalOpen, dispatch } = useModalContext();

	const { pathname } = useLocation();

	useEffect(() => {
		setGenres(type === 'movie' ? genresMovie : genresSeries);
	}, [type]);

	const moviesOrSeries = type === 'movie' ? 'movie' : 'tv';

	const getTrailerKey = (key) => {
		setTrailerKey(key);
	};

	const formattedUrl = pathname === '/movies' ? 'movie' : 'tv';

	const handleInfoModal = async (movie) => {
		// setMovie(movie);
		const res = await axios.get(
			`https://api.themoviedb.org/3/${formattedUrl}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&append_to_response=credits`
		);
		dispatch({ type: 'OPEN_INFO_MODAL' });
		setExpandedMovieData(res.data);
	};
	console.log(expandedMovieData);
	return (
		<div className="home">
			<Navbar />
			<Featured
				type={type}
				isFeaturedTrailerClosed={isFeaturedTrailerClosed}
				setIsFeaturedTrailerClosed={setIsFeaturedTrailerClosed}
				isListItemTrailerClosed={isListItemTrailerClosed}
				setIsListItemTrailerClosed={setIsListItemTrailerClosed}
				handleChange={handleChange}
				trailerKey={trailerKey}
				setTrailerKey={setTrailerKey}
				handleInfoModal={handleInfoModal}
			/>

			{genres?.map((genre) => (
				<List
					genre={genre}
					key={genre.id}
					moviesOrSeries={moviesOrSeries}
					getTrailerKey={getTrailerKey}
					handleInfoModal={handleInfoModal}
					setIsListItemTrailerClosed={setIsListItemTrailerClosed}
				/>
			))}

			{isInfoModalOpen && (
				<InfoModal
					duration={expandedMovieData && expandedMovieData.runtime}
					expandedMovieData={expandedMovieData && expandedMovieData}
				/>
			)}
		</div>
	);
};

export default Home;
