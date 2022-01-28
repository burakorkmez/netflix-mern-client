import { useRef } from 'react';
import { useState } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import { ArrowForwardIos } from '@material-ui/icons';
import AnimationCard from './AnimationCard';
import Faq from './Faq';
import Footer from '../../components/footer/Footer';
import { validateEmail } from '../../functions/validateEmail';
import { useSignup } from '../../hooks/useSignup';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const emailRef = useRef();

	const { error, isPending, signup } = useSignup(
		setUsername,
		setEmail,
		emailRef
	);

	const handleStart = () => {
		const emailIsValid = validateEmail(emailRef.current.value);
		if (!emailIsValid) return;
		setEmail(emailRef.current.value);
	};

	const handleFinish = (e) => {
		e.preventDefault();
		signup(email, username, password);
	};

	return (
		<>
			<div className="register">
				<header className="header">
					<img src="/assets/img/logo.png" alt="" className="logo" />
					<Link className="btn link" to="/login">
						Sign In
					</Link>
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
										Get Started <ArrowForwardIos className="forward-icon" />
									</button>
								</>
							) : (
								<>
									<input
										type="text"
										placeholder="username"
										required
										className="final-step"
										onChange={(e) => setUsername(e.target.value)}
										value={username}
									/>
									<input
										type="password"
										placeholder="password"
										required
										className="final-step"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
									<button
										className={`btn btn-start ${isPending && 'disabled'}`}
										onClick={handleFinish}
										disabled={isPending}
									>
										{isPending ? 'Loading...' : 'Register'} <ArrowForwardIos />
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
