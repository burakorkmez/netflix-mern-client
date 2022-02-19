import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/authContext/AuthContext';
import { formatDate } from '../../functions/formatDate';
import useProfile from '../../hooks/useProfile';
import './profile.scss';

export default function Profile() {
	const { user } = useContext(AuthContext);

	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [profilePicError, setProfilePicError] = useState(null);
	const [disableBtn, setDisableBtn] = useState(true);

	const { error, setError, isPending, updateProfile } = useProfile();

	// format member since date
	const dateStr = formatDate(user);

	// disable button if the infos are the same as before.
	useEffect(() => {
		if (
			username !== user.username ||
			email !== user.email ||
			profilePic !== ''
		) {
			if (!profilePicError) {
				setDisableBtn(false);
			}
		} else {
			setDisableBtn(true);
		}
	}, [username, email, profilePic, user.username, user.email, profilePicError]);

	const handleFileChange = (e) => {
		setProfilePicError(null);
		setProfilePic('');
		let selectedFile = e.target.files[0];

		if (!selectedFile.type.includes('image')) {
			setProfilePicError('Selected file must be an image');
			setProfilePic('');
			return;
		}
		if (!selectedFile) setProfilePic('');
		setProfilePicError(null);
		setProfilePic(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!password) {
			setError('Please enter your password');
			return;
		}
		let value = { password };

		if (!username || !email) {
			setError('Please fill out the form.');
			return;
		}
		if (username !== user.username) {
			value = { username, password };
		}
		if (email !== user.email) {
			value = { username, email, password };
		}

		if (profilePic) {
			value = { profilePic, username, email, password };
		}

		const res = await updateProfile(value);
		if (res) {
			window.location.reload();
		}
	};
	console.log(error);
	return (
		<section className="profile-section">
			<Navbar />
			<div className="profile-container">
				<div className="form-container">
					<h1 className="profile-title">UPDATE PROFILE</h1>
					<form className="user-form" onSubmit={handleSubmit}>
						<div className="user-img">
							<img
								src={`${
									user.profilePic
										? user.profilePic
										: '/assets/img/user-avatar.jpg'
								}`}
								alt="user avatar"
							/>
							<input
								type="file"
								className="user-img-input"
								onChange={handleFileChange}
							/>
						</div>
						<div className="info user-username">
							<label>Username</label>
							<input
								type="text"
								value={username}
								placeholder={user.username}
								className="user-input"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="info user-email">
							<label>Email</label>
							<input
								type="email"
								value={email}
								placeholder={user.email}
								className="user-input"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="info user-password">
							<label>Password</label>
							<input
								type="password"
								placeholder="current password"
								className="user-input"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className="info member-from">
							<label>Member since:</label>
							<span className="user-input">{dateStr}</span>
						</div>
						{error && <h3 className="error">{error}</h3>}
						{profilePicError && <h3 className="error">{profilePicError}</h3>}
						{isPending && (
							<button className="btn-update disabled" disabled>
								Updating...
							</button>
						)}
						{disableBtn && (
							<button className="btn-update disabled" disabled>
								Update
							</button>
						)}
						{!isPending && !disableBtn && (
							<button className="btn-update ">Update</button>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
