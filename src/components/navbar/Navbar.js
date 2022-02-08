import { ArrowDropDown, Notifications } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import './navbar.scss';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { dispatch, user } = useContext(AuthContext);

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};

	const handleClick = () => {
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
			<div className="container">
				<div className="left">
					<img src="/assets/img/logo.png" alt="Netflix logo" />
					<Link to="/" className="link">
						<span>Homepage</span>
					</Link>
					<Link to="/series" className="link">
						<span>Series</span>
					</Link>
					<Link to="/movies" className="link">
						<span>Movies</span>
					</Link>
					<Link to="/favorites" className="link">
						<span>Favorites</span>
					</Link>
				</div>
				<div className="right">
					<Notifications className="icon" />
					<Link to="/profile">
						<img
							src={`${
								user.profilePic
									? user.profilePic
									: '/assets/img/user-avatar.jpg'
							}`}
							alt="user avatar"
						/>
					</Link>
					<div className="profile">
						<ArrowDropDown className="icon" />
						<div className="options">
							<span>Settings</span>
							<span onClick={handleClick}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
