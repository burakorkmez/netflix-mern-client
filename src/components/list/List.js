import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';

import {
	PlayArrow,
	Add,
	ThumbUpAltOutlined,
	ThumbDownOutlined,
} from '@material-ui/icons';

import './list.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { fetchData } from '../../functions/fetchData';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function List({ list }) {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		list.content.map((item) => {
			const getMovie = async () => {
				try {
					const res = await fetchData('GET', '/movies/find/' + item);
					setMovies((prev) => {
						return [...prev, res.data];
					});
				} catch (err) {
					console.log(err);
				}
			};
			getMovie();
		});
	}, [list.content]);

	return (
		<div className="list">
			<h1 className="listTitle">{list.title}</h1>
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
						<SwiperSlide key={movie._id}>
							<img src={movie.img} alt="" className="swiperImg" />
							<div className="innerContext">
								<p className="movieTitle">{movie.title}</p>
								<div className="icons">
									<Link to={`/watch`} className="link">
										<PlayArrow className="icon" />
									</Link>

									<Add className="icon" />
									<ThumbUpAltOutlined
										className="icon"
										onClick={() => console.log('hey')}
									/>
									<ThumbDownOutlined className="icon" />
								</div>
								<span className="movieLimit">+{movie.limit}</span>
								<span className="movieYear">{movie.year}</span>
								<p className="movieDesc">{movie.desc}</p>
							</div>
						</SwiperSlide>
					</>
				))}
			</Swiper>
		</div>
	);
}
