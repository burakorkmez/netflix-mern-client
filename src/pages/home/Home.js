import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import { genresMovie, genresSeries } from '../../helpers/genres';
import './home.scss';

const Home = ({ type, handleChange }) => {
	const [genres, setGenres] = useState([]);
	useEffect(() => {
		setGenres(type === 'movie' ? genresMovie : genresSeries);
	}, [type]);

	return (
		<div className="home">
			<Navbar />
			<Featured type={type} handleChange={handleChange} />
			{genres?.map((genre) => (
				<List genre={genre} key={genre.id} />
			))}
		</div>
	);
};

export default Home;
