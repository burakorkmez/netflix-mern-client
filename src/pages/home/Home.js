import { axiosInstance } from '../../config';
import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';

const Home = ({ type, genre, handleChange }) => {
	const [lists, setLists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setLists([]);
		const getRandomLists = async () => {
			setIsLoading(true);
			try {
				const res = await axiosInstance.get(
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
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				console.log(err);
			}
		};
		getRandomLists();
	}, [genre, type]);

	if (isLoading) {
		return (
			<div className="home">
				<Navbar />
				<Featured type={type} handleChange={handleChange} />
				<div className="notFound">
					<p>Loading...</p>
				</div>
			</div>
		);
	}
	if (lists.length === 0) {
		return (
			<div className="home">
				<Navbar />
				<Featured type={type} handleChange={handleChange} />
				<div className="notFound">
					<p>There is not any {type} with this genre yet</p>
				</div>
			</div>
		);
	}

	return (
		<div className="home">
			<Navbar />
			<Featured type={type} handleChange={handleChange} />
			{lists && lists.map((list) => <List list={list} key={list._id} />)}
		</div>
	);
};

export default Home;
