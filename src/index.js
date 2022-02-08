import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import 'swiper/css/bundle';
import { ModalContextProvider } from './context/modalContext/ModalContext';
import { FavoriteContextProvider } from './context/favoritesContext/FavoriteContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<FavoriteContextProvider>
				<ModalContextProvider>
					<App />
				</ModalContextProvider>
			</FavoriteContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
