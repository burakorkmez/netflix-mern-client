import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/authContext/AuthContext';
import useProfile from '../../hooks/useProfile';
import './profile.scss';

export default function Profile() {
	const {
		state: { user },
	} = useContext(AuthContext);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [profilePicError, setProfilePicError] = useState(null);
	const [disableBtn, setDisableBtn] = useState(true);
	const { error, setError, isPending, updateProfile } = useProfile();

	// format member since date
	const date = new Date(user?.createdAt).getDate();
	const month = new Date(user?.createdAt).getMonth() + 1;
	const year = new Date(user?.createdAt).getFullYear();
	const dateStr = date + '/' + month + '/' + year;

	// disable button if the infos are the same as before.
	useEffect(() => {
		if (
			username === user.username &&
			email === user.email &&
			profilePic === ''
		) {
			setDisableBtn(true);
		} else {
			setDisableBtn(false);
		}
	}, [username, email, profilePic, user.username, user.email]);

	const handleFileChange = (e) => {
		setProfilePic(null);
		let selectedFile = e.target.files[0];
		console.log(selectedFile);

		if (!selectedFile) {
			setProfilePicError('Please select a file');
			return;
		}
		if (!selectedFile.type.includes('image')) {
			setProfilePicError('Selected file must be an image');
			return;
		}
		setProfilePicError(null);
		setProfilePic(selectedFile);
	};
	console.log(username, user.username);

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

		await updateProfile(value);
		window.location.reload();
	};
	// console.log(user);
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
										: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEy-Hi3lntqni03_IgMHV_6nbWR5sG5EuE11oKCej1YqlHvxzo6lfyF7L_JXrJaoZIkY&usqp=CAU'
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
						{/* <button className="btn-update disabled">Update</button> */}
					</form>
				</div>
			</div>
		</section>
	);
}
