import { ArrowDropDown, Notifications } from '@material-ui/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { useModalContext } from '../../context/modalContext/ModalContext';
import './navbar.scss';

const Navbar = ({ handleSearchQuery }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { dispatch, user } = useContext(AuthContext);
	const { dispatch: dispatchModal } = useModalContext();

	const searchInputRef = useRef();

	const { pathname } = useLocation();
	let history = useHistory();
	const isSearchPage = pathname.includes('/search');
	const isMoviePage = pathname.includes('/movie') ? 'movies' : 'series';

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};

	useEffect(() => {
		if (isSearchPage) {
			searchInputRef.current.focus();
			searchInputRef.current.value = 'breaking bad';
			handleSearchQuery('breaking bad');
		}
	}, [isSearchPage]);

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};

	const handleClick = () => {
		dispatchModal({ type: 'CLOSE_INFO_MODAL' });
		dispatchModal({ type: 'CLOSE_YOUTUBE_MODAL' });
	};

	// send query to Search.js
	const handleChange = (e) => {
		handleSearchQuery(e.target.value);
	};

	return (
		<div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
			<div className="container">
				<div className="left">
					<img src="/assets/img/logo.png" alt="Netflix logo" />
					<NavLink to="/movies" className="link" onClick={handleClick}>
						<span>Movies</span>
					</NavLink>
					<NavLink to="/series" className="link" onClick={handleClick}>
						<span>Series</span>
					</NavLink>
					<NavLink to="/favorites" className="link">
						<span>Favorites</span>
					</NavLink>
				</div>
				<div className="right">
					{/* {isSearchPage && ( */}
					<div className="input-container">
						<div className="search-box">
							<input
								type="text"
								placeholder={`Search ${isMoviePage}`}
								onChange={handleChange}
								onFocus={() => history.push(`/${isMoviePage}/search`)}
								ref={searchInputRef}
							/>
							<span></span>
						</div>
					</div>
					{/* )} */}
					{/* <Notifications className="icon" /> */}
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
							<span onClick={handleLogout}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
