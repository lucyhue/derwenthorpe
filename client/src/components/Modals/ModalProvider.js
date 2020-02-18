import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { registeredModals } from './registerModal';
import { ModalDialog } from './ModalDialog';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [openModal, setOpenModal] = useState(null);
	const Component = openModal ? registeredModals[openModal] : null;

	return (
		<ModalContext.Provider value={setOpenModal}>
			{openModal &&
				<ModalDialog>
					<Component key={openModal} />
				</ModalDialog>
			}
			{children}
		</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
