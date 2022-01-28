import './App.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import Profile from './pages/profile/Profile';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';

function App() {
	const { user } = useContext(AuthContext);
	const [genre, setGenre] = useState(null);

	const handleChange = (value) => {
		setGenre(value);
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login">
					{!user ? <Login /> : <Redirect to="/" />}
				</Route>
				<Route exact path="/register">
					{!user ? <Register /> : <Redirect to="/" />}
				</Route>
				<Route exact path="/">
					{user ? <Home type={''} /> : <Redirect to="/login" />}
				</Route>

				<Route exact path="/movies">
					{user ? (
						<Home
							type={'movie'}
							handleChange={handleChange}
							setGenre={setGenre}
							genre={genre}
						/>
					) : (
						<Redirect to="/login" />
					)}
				</Route>
				<Route exact path="/series">
					{user ? (
						<Home
							type={'series'}
							handleChange={handleChange}
							setGenre={setGenre}
							genre={genre}
						/>
					) : (
						<Redirect to="/login" />
					)}
				</Route>
				<Route path="/watch">
					{user ? <Watch /> : <Redirect to="/login" />}
				</Route>
				<Route path="/profile">
					{user ? <Profile /> : <Redirect to="/login" />}
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
