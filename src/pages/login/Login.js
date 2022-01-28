import './login.scss';
import { useState, useContext } from 'react';
import { loginCall } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../functions/validateEmail';
import { projectAuth } from '../../firebase/firebase';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { dispatch, error, isFetching } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailIsValid = validateEmail(email);
		if (!emailIsValid) return;
		try {
			const res = await loginCall(dispatch, { email, password });

			const userCredential = await projectAuth.signInWithCustomToken(
				res.customToken
			);
			const user = userCredential.user;
			await user.updateEmail;
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<section className="login">
			<div className="top">
				<Link to="/register">
					<div className="wrapper">
						<img className="logo" src="/assets/img/logo.png" alt="" />
					</div>
				</Link>
			</div>
			<div className="container">
				<form onSubmit={handleSubmit}>
					<h1>Sign In</h1>
					<input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!isFetching && <button className="login-btn">Sign In</button>}
					{isFetching && (
						<button className={`login-btn ${isFetching ? 'disabled' : ''}`}>
							Signin In...
						</button>
					)}
					{error && <p className="error">{error}</p>}
					<span>
						New to Netflix?
						<Link to="/register" className="link">
							<b className="sign-up-now">Sign up now.</b>
						</Link>
					</span>
					<small>
						This page is protected by Google reCAPTCHA to ensure you're not a
						bot.
					</small>
					<small>"Developed by Burak Orkmez"</small>
				</form>
			</div>
		</section>
	);
}
