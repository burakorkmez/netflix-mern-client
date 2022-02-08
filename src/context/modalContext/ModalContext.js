import { useReducer } from 'react';
import { createContext, useContext } from 'react';

export const ModalContext = createContext();

const modalReducer = (state, action) => {
	switch (action.type) {
		case 'OPEN_MODAL':
			return { isModalOpen: true };
		case 'CLOSE_MODAL':
			return { isModalOpen: false };
		default:
			return state;
	}
};

// useContext

export const ModalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, { isModalOpen: false });
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
