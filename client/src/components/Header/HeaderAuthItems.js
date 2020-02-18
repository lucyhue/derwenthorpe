import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// MUI
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

// core components
import { authSelectors } from 'user/auth';
import { authActions } from 'user/auth/authActions';
import { userHelpers } from 'user/userHelpers';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { ModalContext } from '../Modals/ModalProvider';
import { useStyles } from './HeaderNavItemStyles';
import '../SignInUp'; // so dialogs are registered

export function HeaderAuthItems() {
	const isAuthenticated = useSelector(authSelectors.user.isAuthenticated);
	const currentUser = useSelector(authSelectors.user.currentUser);
	let avatarUrl = null;
	let userFullName = '';
	if (currentUser) {
		avatarUrl = currentUser.avatarUrl;
		userFullName = currentUser && userHelpers.getFullName(currentUser);
	}
	const stylesheet = useStyles();
	const dispatch = useDispatch();
	const setOpenModal = useContext(ModalContext);
	const history = useHistory();

	const handleMenuClick = (item) => {
		switch (item) {
			case 'Profile':
				history.push('/profile');
				break;
			case 'Sign out':
				dispatch(authActions.saga.signout.request());
				break;
			default:
		}
	};

	const handleOpenSignIn = () => setOpenModal('signIn');
	const handleOpenSignUp = () => setOpenModal('signUp');

	if (!isAuthenticated) {
		return (
			<ListItem key='signin' className={stylesheet.listItem}>
				<Button className={stylesheet.navLink} aria-label='sign in' onClick={handleOpenSignIn}>
					Sign In
				</Button>
				<Button className={stylesheet.navLink} aria-label='sign up' onClick={handleOpenSignUp}>
					Sign Up
				</Button>
			</ListItem >
		)
	} else {
		return (
			<CustomDropdown
				dropdownList={['Profile', 'Sign out']}
				onClick={handleMenuClick}
			>
				<UserAvatar
					avatarUrl={avatarUrl}
					fullName={userFullName}
					uniqueName={currentUser.uniqueName}
					size={40}
				/>
			</CustomDropdown>
		);
		// <AlertsButton />
	}

}
