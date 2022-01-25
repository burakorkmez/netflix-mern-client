import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import './navbar.scss';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const {
		dispatch,
		state: { user },
	} = useContext(AuthContext);

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
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>
					<Link to="/" className="link">
						<span>Homepage</span>
					</Link>
					<Link to="/series" className="link">
						<span>Series</span>
					</Link>
					<Link to="/movies" className="link">
						<span>Movies</span>
					</Link>
				</div>
				<div className="right">
					<Notifications className="icon" />
					<Link to="/profile">
						<img
							src={`${
								user.profilePic
									? user.profilePic
									: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEy-Hi3lntqni03_IgMHV_6nbWR5sG5EuE11oKCej1YqlHvxzo6lfyF7L_JXrJaoZIkY&usqp=CAU'
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
