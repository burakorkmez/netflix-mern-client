import './login.scss';
import { useState, useContext } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { dispatch } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		login(dispatch, { email, password });
	};
	return (
		<div className="login">
			<div className="top">
				<div className="wrapper">
					<img
						className="logo"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>
				</div>
			</div>
			<div className="container">
				<form onSubmit={handleSubmit}>
					<h1>Sign In</h1>
					<input
						type="email"
						placeholder="Email or phone number"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="loginButton">Sign In</button>
					<span>
						New to Netflix? <b>Sign up now.</b>
					</span>
					<small>
						This page is protected by Google reCAPTCHA to ensure you're not a
						bot. <b>Learn more</b>.
					</small>
				</form>
			</div>
		</div>
	);
}
