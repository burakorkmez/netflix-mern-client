import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';
import './featured.scss';

export default function Featured({ type, handleChange }) {
	const [content, setContent] = useState(null);

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axiosInstance.get(`/movies/random?type=${type}`, {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				setContent(res.data[0]);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
		console.log(content);
	}, [type]);

	return (
		<div className="featured">
			{type && (
				<div className="category">
					<span>{type === 'movie' ? 'Movies' : 'Series'}</span>
					<select
						name="genre"
						id="genre"
						onChange={(e) => handleChange(e.target.value)}
					>
						<option value="">Genre</option>
						<option value="Action">Action</option>
						<option value="Comedy">Comedy</option>
						<option value="crime">Crime</option>
					</select>
				</div>
			)}
			<img src={content?.img} className="featuredImg" alt="" />
			<div className="info">
				<h1>{content?.title}</h1>
				<span className="desc">{content?.desc}</span>
				<div className="buttons">
					<Link to="/watch">
						<button className="play">
							<PlayArrow />
							<span>Play</span>
						</button>
					</Link>
					<button className="more">
						<InfoOutlined />
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
}
