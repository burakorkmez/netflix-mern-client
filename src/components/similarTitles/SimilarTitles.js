import { AddCircleOutline, PlayArrow } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModalContext } from '../../context/modalContext/ModalContext';
import AboutMovie from '../aboutMovie/AboutMovie';

import './similarTitle.scss';

const SimilarTitles = ({
	movie,
	handleSimilarTitleTrailer,
	expandedMovieData,
}) => {
	const [similarTitles, setSimilarTitles] = useState([]);
	const { dispatch } = useModalContext();
	const { movieOrSeries } = useParams();
	const formattedUrl = movieOrSeries === 'movies' ? 'movie' : 'tv';

	useEffect(() => {
		const getSimilarTitles = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/${formattedUrl}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&append_to_response=release_dates,credits,recommendations`
			);

			console.log(res.data);
			setSimilarTitles(res.data.recommendations.results);
		};
		getSimilarTitles();
	}, [movie.id]);

	const handleClick = async (id) => {
		dispatch({ type: 'OPEN_YOUTUBE_MODAL' });
		handleSimilarTitleTrailer(id);
	};
	console.log(expandedMovieData);

	return (
		<>
			<h1 style={{ padding: '0 3rem' }}>Similar Titles</h1>
			<div className="similar-title-wrapper">
				{similarTitles.map((similarTitle) => (
					<div className="similar-title-item">
						<div class="img-wrapper">
							<div class="img-overlay"></div>
							<img
								src={`https://image.tmdb.org/t/p/original/${similarTitle.backdrop_path}`}
								alt=""
							/>
							<div className="info">
								<h3>
									{movieOrSeries === 'movies' && similarTitle.original_title}
									{movieOrSeries === 'series' && similarTitle.original_name}
								</h3>
								<div className="">
									<span className="rating">
										Rating: {similarTitle.vote_average}
									</span>
									<span className="year">
										{movieOrSeries === 'movies' &&
											new Date(similarTitle.released_date).getFullYear()}
										{movieOrSeries === 'series' &&
											new Date(similarTitle.first_air_date).getFullYear()}
									</span>
									{/* <span className="duration">1 h 35 min.</span> */}
								</div>
							</div>
						</div>
						<div className="similar-title-overview">
							<div className="similar-title-buttons">
								<div className="movie-btn-wrapper">
									<button
										className="play"
										onClick={() => handleClick(similarTitle.id)}
									>
										<PlayArrow />
										<span>Play</span>
									</button>
									<AddCircleOutline className="icon" />
								</div>
								<p>
									{similarTitle.overview.length < 300
										? similarTitle.overview
										: similarTitle.overview.slice(0, 300) + '...'}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<AboutMovie expandedMovieData={expandedMovieData} />
		</>
	);
};

export default SimilarTitles;
