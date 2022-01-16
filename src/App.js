import './App.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
	const user = true;
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
					{user ? <Home /> : <Redirect to="/login" />}
				</Route>

				<Route exact path="/movies">
					{user ? <Home type={'movie'} /> : <Redirect to="/login" />}
				</Route>
				<Route exact path="/series">
					{user ? <Home type={'series'} /> : <Redirect to="/login" />}
				</Route>
				<Route exact path="/watch">
					{user ? <Watch /> : <Redirect to="/login" />}
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
