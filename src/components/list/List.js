import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function List({ list }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		list.content.map((item, i) => {
			const getMovie = async () => {
				try {
					const res = await axios.get('movies/find/' + item, {
						headers: {
							token:
								'Bearer ' +
								JSON.parse(localStorage.getItem('user')).accessToken,
						},
					});
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
	// console.log(movies);

	// console.log(list);
	// if (movies.length === 0) return <h1>loading...</h1>;
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
						spaceBetween: 30,
					},
				}}
			>
				{movies.map((movie, i) => (
					// <ListItem index={i} item={item} key={i} />
					<>
						<SwiperSlide key={i}>
							{/* <div className="slider-item-wraper"> */}

							{/* <div className="img-wrapper"> */}
							<img src={movie.img} alt="" className="swiperImg" />
							{/* </div> */}
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
							{/* </div> */}
						</SwiperSlide>
					</>
				))}
			</Swiper>
		</div>
	);
}
