import './listItem.scss';
import {
	PlayArrow,
	Add,
	ThumbUpAltOutlined,
	ThumbDownOutlined,
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get('movies/find/' + item, {
					headers: {
						token:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTQ0MGYxN2ZmMzk5MzM3Yzk1M2UyZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjM0ODk0OSwiZXhwIjoxNjQyNzgwOTQ5fQ.IVJ4ZKmnKHRxX4gy6ltxDl2A39_iN5a1L1tox1O9NmI',
					},
				});
				setMovie(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMovie();
	}, [item]);
	// console.log(movie && movie.trailer);
	if (movie) {
		return (
			<Link to={{ pathname: '/watch', movie: movie && movie }}>
				<div
					className="listItem"
					style={{ left: isHovered && index * 225 - 40 + index * 2.5 }}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<img src={movie && movie.img} alt="" />
					{isHovered && (
						<>
							<video src={movie.trailer} autoPlay={true} loop />
							{movie.title}
							<div className="itemInfo">
								<div className="icons">
									<PlayArrow className="icon" />
									<Add className="icon" />
									<ThumbUpAltOutlined className="icon" />
									<ThumbDownOutlined className="icon" />
								</div>
								<div className="itemInfoTop">
									<span>1 hour 14 mins</span>
									<span className="limit">+{movie.limit}</span>
									<span>{movie.year}</span>
								</div>
								<div className="desc">{movie.desc}</div>
								<div className="genre">{movie.genre}</div>
							</div>
						</>
					)}
				</div>
			</Link>
		);
	} else {
		return <div style={{ color: 'white' }}>loading...</div>;
	}
}
