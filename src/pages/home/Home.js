import axios from 'axios';
import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';

const Home = ({ type }) => {
	const [lists, setLists] = useState([]);
	const [genre, setGenre] = useState(null);

	useEffect(() => {
		const getRandomLists = async () => {
			try {
				const res = await axios.get(
					`lists${type ? `?type=${type}` : ''}${
						genre ? `&genre=${genre}` : ''
					}`,
					{
						headers: {
							token:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTQ0MGYxN2ZmMzk5MzM3Yzk1M2UyZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjM0ODk0OSwiZXhwIjoxNjQyNzgwOTQ5fQ.IVJ4ZKmnKHRxX4gy6ltxDl2A39_iN5a1L1tox1O9NmI',
						},
					}
				);
				setLists(res.data);
				console.log(res.data);
				console.log(
					`lists${type ? `?type=${type}` : ''}${genre ? `&genre=${genre}` : ''}`
				);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomLists();
	}, [genre, type]);
	return (
		<div className="home">
			<Navbar />
			<Featured type={type} />
			{lists && lists.map((list) => <List list={list} key={list._id} />)}
		</div>
	);
};

export default Home;
