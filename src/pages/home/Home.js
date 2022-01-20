import axios from 'axios';
import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';

const Home = ({ type, genre, handleChange }) => {
	const [lists, setLists] = useState([]);

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
								'Bearer ' +
								JSON.parse(localStorage.getItem('user')).accessToken,
						},
					}
				);
				setLists(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomLists();
	}, [genre, type]);
	return (
		<div className="home">
			<Navbar />
			<Featured type={type} handleChange={handleChange} />
			{lists && lists.map((list) => <List list={list} key={list._id} />)}
		</div>
	);
};

export default Home;
