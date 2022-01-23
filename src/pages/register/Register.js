import { useRef } from 'react';
import { useState } from 'react';
import './register.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ArrowForwardIos } from '@material-ui/icons';
import AnimationCard from './AnimationCard';
import Faq from './Faq';
import Footer from '../../components/footer/Footer';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const emailRef = useRef();

	const handleStart = () => {
		setEmail(emailRef.current.value);
	};
	const handleFinish = async (e) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		try {
			await axios.post('/auth/register', { email, username, password });
			setIsLoading(false);
			setError(null);
			history.push('/login');
		} catch (err) {
			setIsLoading(false);
			if (err.response.data?.keyPattern?.username === 1)
				setError('This username is already taken. Please use another one');
			setUsername('');
			if (err.response.data?.keyPattern?.email === 1) {
				setError('This email is already taken. Please use another one');
				setEmail('');
			}
			emailRef.current.focus();
		}
	};
	return (
		<>
			<div className="register">
				<header className="header">
					<img src="/assets/img/logo.png" alt="" className="logo" />
					<button className="btn">Sign In</button>
				</header>
				<div className="text-wrapper">
					<h1 className="main-title">Unlimited movies, TV shows, and more.</h1>
					<h2 className="subtitle">Watch anywhere. Cancel anytime.</h2>
					<form className="register-form">
						<h3 className="form-title">
							Ready to watch? Enter your email to create or restart your
							membership.
						</h3>
						<div className="input-wrapper">
							{!email ? (
								<>
									<input
										type="email"
										placeholder="Email address"
										required
										ref={emailRef}
									/>
									<button className="btn btn-start" onClick={handleStart}>
										Get Started <ArrowForwardIos />
									</button>
								</>
							) : (
								<>
									<input
										type="text"
										placeholder="username"
										required
										onChange={(e) => setUsername(e.target.value)}
										value={username}
									/>
									<input
										type="password"
										placeholder="password"
										required
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
									<button
										className={`btn btn-start ${isLoading && 'disabled'}`}
										onClick={handleFinish}
										disabled={isLoading}
									>
										{isLoading ? 'Loading...' : 'Register'} <ArrowForwardIos />
									</button>
								</>
							)}
						</div>
						{error && <div className="error">{error}</div>}
					</form>
				</div>
			</div>
			<AnimationCard
				mainText={'Enjoy on your TV.'}
				subText={
					'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.'
				}
				imgUrl={'./assets/img/tv.png'}
				video={'./assets/video/tv-video.m4v'}
			/>
			<AnimationCard
				mainText={'Download your shows to watch offline.'}
				subText={
					'Save your favorites easily and always have something to watch.'
				}
				imgUrl={'./assets/img/download.jpg'}
				reverse
			/>
			<AnimationCard
				mainText={'Watch everywhere.'}
				subText={
					'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.'
				}
				imgUrl={'./assets/img/device-pile.png'}
				video={'./assets/video/video-devices.m4v'}
				videoDevices
			/>
			<AnimationCard
				mainText={'Create profiles for kids.'}
				subText={
					'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.'
				}
				imgUrl={'./assets/img/kids.png'}
				reverse
			/>
			<Faq />
			<div className="footer-wrapper">
				<Footer />
			</div>
		</>
	);
}
