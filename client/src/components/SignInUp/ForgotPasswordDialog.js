import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useValidatedState } from 'core/useValidatedState';
import { authActions } from 'user/auth/authActions';
import { authSelectors } from 'user/auth/authSelectors';
import { ValidatedTextField } from '../ValidatedTextField';
import { useStyles } from './SignInDialogStyles';
import { registerModal } from '../Modals/registerModal';
import { ModalContext } from '../Modals/ModalProvider';

export function ForgotPasswordDialog() {
	const stylesheet = useStyles();
	const isAuthenticating = useSelector(authSelectors.user.isAuthenticating);
	const authenticationError = useSelector(authSelectors.user.authenticationError);
	const dispatch = useDispatch();
	const setOpenModal = useContext(ModalContext);

	const initialState = {
		emailAddress: '',
	};
	const validationRules = {
		emailAddress: {
			validateOn: 'onChange',
			rules: [
				{
					validator: 'isRequired',
					error: 'Please enter your email address.',
				},
			],
		},
	};
	const [eventHandlers, selectors] = useValidatedState(initialState, validationRules);
	const textFields = [
		{ name: 'emailAddress', type: 'text', label: 'Email Address', autocomplete: 'email' },
	];

	const handleResetPassword = () => {
		eventHandlers.validateAll();
		if (selectors.areAllValid()) {
			const validState = selectors.validState();
			dispatch(authActions.saga.forgotPassword.request({ ...validState, setOpenModal }));
		}
	}

	const renderErrors = (errors) => {
		return Object.keys(errors).map((key) => {
			return (
				<DialogContentText className={stylesheet.authError} key={key}>
					{errors[key]}
				</DialogContentText>
			);
		});
	}

	const handleCloseDialog = () => {
		setOpenModal(null);
	}

	return (
		<>
			<DialogTitle id='dialog-title' className={stylesheet.dialogTitle}>RESET PASSWORD</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the email address associated with your account, and we’ll email you a link to reset your password.
				</DialogContentText>
				{textFields.map((config) => (
					<ValidatedTextField
						key={config.name}
						config={config}
						eventHandlers={eventHandlers}
						selectors={selectors}
					/>
				))}
			</DialogContent>
			<DialogActions className={stylesheet.actionButtons}>
				<Button
					variant='contained'
					onClick={handleResetPassword}
					color='primary'
					endIcon={isAuthenticating && <CircularProgress size={24} className={stylesheet.signinProgress} />}
				>
					Send Reset Link
				</Button>
				<Button onClick={handleCloseDialog} color='primary'>Cancel</Button>
			</DialogActions>
			<DialogContent>
				{authenticationError !== null && renderErrors(authenticationError)}
			</DialogContent>
		</>
	);

}

registerModal('forgotPassword', ForgotPasswordDialog);
