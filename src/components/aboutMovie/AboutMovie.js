import { useLocation } from 'react-router-dom';
import './aboutMovie.scss';

const AboutMovie = ({ expandedMovieData }) => {
	const { pathname } = useLocation();
	const isMovie = pathname.startsWith('/movies') && true;
	const director = expandedMovieData.credits.crew.find(
		(member) => member.job === 'Director'
	);
	const casts = expandedMovieData.credits.cast.slice(0, 10);
	return (
		<div className="about-movie" id="about">
			<h3 className="title">
				About{' '}
				<span>
					{isMovie && expandedMovieData.original_title}
					{!isMovie && expandedMovieData.original_name}
				</span>
			</h3>
			{director && (
				<p>
					<span>Director: </span>
					<span className="about-movie-value">{director.name}</span>
				</p>
			)}
			<p>
				<span>Production Companies: </span>
				{expandedMovieData?.production_companies.map((company, i) => (
					<span className="about-movie-value">{company.name}</span>
				))}
			</p>
			<p>
				<span>Cast: </span>
				{casts.map((cast, i) => (
					<span className="about-movie-value">{cast.name}</span>
				))}
			</p>
			<p>
				<span>Genres: </span>
				{expandedMovieData.genres.map((genre, i) => (
					<span className="about-movie-value">{genre.name}</span>
				))}
			</p>
			<p>
				<span>Status: </span>
				<span className="about-movie-value">{expandedMovieData.status}</span>
			</p>
			<p>
				<span>Release Date: </span>
				<span className="about-movie-value">
					{isMovie && expandedMovieData.release_date}
					{!isMovie && expandedMovieData.first_air_date}
				</span>
			</p>
		</div>
	);
};

export default AboutMovie;
