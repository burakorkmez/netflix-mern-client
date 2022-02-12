import { genresMovie } from '../helpers/genres';
export default function getGenresOfMovie(movie) {
	// get genres of  movie/series
	const genresOfMovie = [];
	movie?.genres.forEach(({ id }, i) => {
		genresMovie.forEach((genre) => {
			if (id === genre.id) {
				genresOfMovie.push(genre.name);
			}
		});
	});
	return genresOfMovie;
}
