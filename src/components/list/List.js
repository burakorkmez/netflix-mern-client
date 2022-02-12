import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	InfoOutlined,
	ArrowForwardIos,
	PlayCircleOutlineRounded,
	AddCircleOutlineRounded,
} from '@material-ui/icons';

import './list.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useModalContext } from '../../context/modalContext/ModalContext';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function List({
	genre,
	setIsListItemTrailerClosed,
	getTrailerKey,
	handleInfoModal,
}) {
	const [movies, setMovies] = useState([]);
	const { pathname } = useLocation();

	const { dispatch } = useModalContext();

	const formattedUrl = pathname === '/movies' ? 'movie' : 'tv';
	useEffect(() => {
		const getMovies = async () => {
			const res = await axios.get(
				`https://api.themoviedb.org/3/discover/${formattedUrl}?api_key=${process.env.REACT_APP_TMDB_MOVIE_API}&language=en-US&page=1&with_genres=${genre.id}#`
			);
			setMovies(res.data.results);
		};
		getMovies();
	}, [genre.id, formattedUrl]);

	const handleTrailer = (id) => {
		dispatch({ type: 'OPEN_YOUTUBE_MODAL' });
		setIsListItemTrailerClosed(false);
		getTrailerKey(id);
		console.log(id);
	};

	return (
		<div className="list">
			<h2 className="list-title">
				<Link
					to={`/${
						pathname === '/movies' ? 'movies' : 'series'
					}/${genre.name.toLowerCase()}`}
				>
					<div className="list-title-wrapper">
						{genre.name}
						<div className="list-title-wrapper">
							<ArrowForwardIos className="icon" />
							<p className="list-p">
								All {genre.name} {pathname === '/movies' ? 'movies' : 'series'}
							</p>
						</div>
					</div>
				</Link>
			</h2>
			<Swiper
				freeMode={true}
				className="mySwiper"
				breakpoints={{
					740: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					968: {
						slidesPerView: 3,
						spaceBetween: 40,
					},
					1200: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
				}}
			>
				{movies.map((movie) => (
					<>
						<SwiperSlide key={movie.id}>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
								alt="movie thumbnail"
								className="swiperImg"
							/>
							<div className="innerContext">
								<p className="movieTitle">
									{pathname === '/movies'
										? movie.original_title
										: movie.original_name}
								</p>
								<div className="icons">
									<span onClick={() => handleTrailer(movie.id)}>
										<PlayCircleOutlineRounded className="icon" />
									</span>

									<AddCircleOutlineRounded className="icon" />
									<InfoOutlined
										className="icon "
										onClick={() => handleInfoModal(movie)}
									/>
								</div>
								<span className="movieYear">
									{new Date(
										pathname === '/movies'
											? movie.release_date
											: movie.first_air_date
									).getFullYear()}
								</span>
								<p className="movieDesc">{movie.overview}</p>
							</div>
						</SwiperSlide>
					</>
				))}
			</Swiper>
		</div>
	);
}
