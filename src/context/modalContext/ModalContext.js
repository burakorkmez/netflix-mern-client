import { useReducer } from 'react';
import { createContext, useContext } from 'react';

export const ModalContext = createContext();

const modalReducer = (state, action) => {
	switch (action.type) {
		case 'OPEN_YOUTUBE_MODAL':
			return { ...state, isYoutubeModalOpen: true };
		case 'CLOSE_YOUTUBE_MODAL':
			return { ...state, isYoutubeModalOpen: false };
		case 'OPEN_INFO_MODAL':
			return { ...state, isInfoModalOpen: true };
		case 'CLOSE_INFO_MODAL':
			return { ...state, isInfoModalOpen: false };
		default:
			return state;
	}
};

// useContext

export const ModalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, {
		isYoutubeModalOpen: false,
		isInfoModalOpen: false,
	});
	return (
		<ModalContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ModalContext.Provider>
	);
};
export const useModalContext = () => {
	const context = useContext(ModalContext);
	return context;
};
