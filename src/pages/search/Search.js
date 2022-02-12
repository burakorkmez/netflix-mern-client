import './search.scss';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { SearchOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
import MoviesGridItem from '../movies/MoviesGridItem';
import Modal from '../../components/modal/Modal';
import InfoModal from '../../components/modal/InfoModal';
import { useModalContext } from '../../context/modalContext/ModalContext';

const Search = () => {
	const [query, setQuery] = useState('');
	const [searchedResults, setSearchedResults] = useState([]);
	const [expandedMovieData, setExpandedMovieData] = useState([]);
	const [duration, setDuration] = useState(null);

	const { isYoutubeModalOpen, isInfoModalOpen } = useModalContext();

	const { pathname } = useLocation();
	const isMovie = pathname.includes('movie') ? 'movie' : 'tv';

	useEffect(() => {
		const getResults = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/search/${isMovie}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&page=1&query=${query}`
			);

			setSearchedResults(res.data.results);
		};

		getResults();
	}, [query, isMovie]);

	console.log(searchedResults);
	const debounce = useDebounce();

	const handleSearchQuery = (query) => {
		if (query === '') setSearchedResults([]);
		debounce(() => setQuery(query), 500);
	};

	const handleSetMovie = (undefined, duration, expandedMovieData) => {
		setExpandedMovieData(expandedMovieData);
		setDuration(duration);
	};

	return (
		<div className="search-page">
			<Navbar handleSearchQuery={handleSearchQuery} />
			<div className="search-container">
				<div className="search-title">
					<SearchOutlined className="search-icon" />
					{isMovie === 'movie' && <h1>{isMovie.toUpperCase() + 'S'}</h1>}
					{isMovie === 'tv' && <h1>{isMovie.toUpperCase() + ' SERIES'}</h1>}
				</div>

				<div className="grid">
					{searchedResults &&
						searchedResults.map((movie) => (
							<MoviesGridItem
								movie={movie}
								key={movie.id}
								handleSetMovie={handleSetMovie}
							/>
						))}
				</div>
			</div>
			{isYoutubeModalOpen && <Modal id={expandedMovieData?.id} />}
			{isInfoModalOpen && (
				<InfoModal
					duration={expandedMovieData && expandedMovieData.runtime}
					expandedMovieData={expandedMovieData}
				/>
			)}
		</div>
	);
};

export default Search;
