import { useReducer } from 'react';
import { createContext } from 'react';

export const FavoriteContext = createContext();

const INITIAL_STATE = {
	favs: [],
};

const FavoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVS':
			return { favs: [...state.favs, action.payload] };
		case 'REMOVE_FROM_FAVS':
			const filteredArr = state.favs.filter(
				(movie) => movie.id !== action.payload.id
			);
			return { favs: filteredArr };
		default:
			return state;
	}
};

export const FavoriteContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(FavoriteReducer, INITIAL_STATE);
	return (
		<FavoriteContext.Provider value={{ ...state, dispatch }}>
			{children}{' '}
		</FavoriteContext.Provider>
	);
};
