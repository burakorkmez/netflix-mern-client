import './aboutMovie.scss';

const AboutMovie = ({ expandedMovieData }) => {
	const { name: directorName } = expandedMovieData.casts.crew.find(
		(member) => member.job === 'Director'
	);
	const casts = expandedMovieData.casts.cast.slice(0, 10);
	return (
		<div className="about-movie" id="about">
			<h3 className="title">
				About <span>{expandedMovieData.original_title}</span>
			</h3>
			<p>
				<span>Director: </span>
				<span className="about-movie-value">{directorName}</span>
			</p>
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
					{expandedMovieData.release_date}
				</span>
			</p>
		</div>
	);
};

export default AboutMovie;
