import './login.scss';
import { useState, useContext } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { dispatch } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		login(dispatch, { email, password });
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
					<button className="login-btn">Sign In</button>
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
