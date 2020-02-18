import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { authSelectors } from 'user/auth';
import { ModalContext } from '../Modals/ModalProvider';

export const AuthRoute = ({ children, ...rest }) => {
	const isAuthenticated = useSelector(authSelectors.user.isAuthenticated);
	const setOpenModal = useContext(ModalContext);

	if (!isAuthenticated) {
		setOpenModal('signIn');
		return null;
	} else {
		setOpenModal(null);
	}

	return (
		<Route {...rest} >
			{children}
		</Route>
	);
};

AuthRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
