import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../config';
import { AuthContext } from '../context/authContext/AuthContext';
import { projectStorage } from '../firebase/firebase';

export default function useProfile() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { user } = useContext(AuthContext);

	const updateProfile = async (value) => {
		const { username, email, profilePic, password } = value;
		setError(null);
		setIsPending(true);
		try {
			let imgUrl = user.profilePic ? user.profilePic : '';
			if (profilePic) {
				const uploadPath = `profilePics/${user._id}/pp.jpg`;
				const img = await projectStorage.ref(uploadPath).put(profilePic);
				imgUrl = await img.ref.getDownloadURL();
			}

			const res = await axiosInstance.put(
				`/users/${user._id}`,
				{ profilePic: imgUrl, username, email, password },
				{
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				}
			);
			if (res.status === 200) {
				const { username, email, profilePic } = res.data;
				let json = JSON.parse(localStorage.getItem('user'));
				json.username = username;
				json.email = email;
				json.profilePic = profilePic;

				localStorage.setItem('user', JSON.stringify(json));

				return res.data;
			}

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			setIsPending(false);
			if (err.message === 'Request failed with status code 401')
				return setError('Wrong password!');
			console.error(err.message);
			setError(err.message);
		}
	};
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { error, isPending, updateProfile, setError };
}
