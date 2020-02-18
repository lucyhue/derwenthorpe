import React, { useContext } from 'react';
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

// core components
import { PASSWORD_MIN_LENGTH } from 'app/appConstants';
import { authActions } from 'user/auth/authActions';
import { authSelectors } from 'user/auth/authSelectors';
import { useValidatedState } from 'core/useValidatedState';
import { ValidatedTextField } from '../ValidatedTextField';
import { registerModal } from '../Modals/registerModal';
import { ModalContext } from '../Modals/ModalProvider';

// style
import { useStyles } from './SignUpDialogStyles';

export function SignUpDialog() {
	const stylesheet = useStyles();
	const isAuthenticating = useSelector(authSelectors.user.isAuthenticating);
	const authenticationError = useSelector(authSelectors.user.authenticationError);
	const dispatch = useDispatch();
	const setOpenModal = useContext(ModalContext);
	// const { executeRecaptcha } = useGoogleReCaptcha();

	const initialState = {
		firstName: '',
		lastName: '',
		uniqueName: '',
		emailAddress: '',
		password: '',
	};
	const validationRules = {
		firstName: {
			validateOn: 'blur',
			rules: [
				{
					validator: 'isRequired',
					error: 'Please enter your first name.',
				},
			],
		},
		lastName: {
			validateOn: 'blur',
			rules: [
				{
					validator: 'isRequired',
					error: 'Please enter your last name.',
				},
			],
		},
		uniqueName: {
			validateOn: 'blur',
			rules: [
				{
					validator: 'isRequired',
					error: 'Please enter a unique name.',
				},
			],
		},
		emailAddress: {
			validateOn: 'blur',
			rules: [
				{
					validator: 'isRequired',
					error: 'Please enter your email address.',
				},
				{
					validator: 'isEmail',
					error: 'Please enter a valid email address.',
				},
			],
		},
		password: {
			validateOn: 'change',
			rules: [
				{
					validator: 'hasMinStringLength',
					compareWith: PASSWORD_MIN_LENGTH,
					error: `Your password should be at least ${PASSWORD_MIN_LENGTH} chars long.`,
				},
			],
		},
	};
	const [eventHandlers, selectors] = useValidatedState(initialState, validationRules);
	const textFields = [
		{ name: 'firstName', type: 'text', label: 'First Name' },
		{ name: 'lastName', type: 'text', label: 'Last Name' },
		{ name: 'uniqueName', type: 'text', label: 'Unique Name', helperText: 'Your name is not neccessarily unique and your email address is not shown, so we ask for a unique name to help others refer to you unambiguously.' },
		{ name: 'emailAddress', type: 'text', label: 'Email Address' },
		{ name: 'password', type: 'text', label: 'Password', helperText: 'Your password must be at least 10 characters long. We recommend it contains a mix of upper and lower case characters, numerals and other symbols. We also strongly recommend you use a password manager such as LastPass or 1Password.' },
	];

	const onSignup = async (event) => {
		event.preventDefault();
		if (selectors.areAllValid()) {
			const validState = selectors.validState();
			// const token = await executeRecaptcha('signup');
			dispatch(authActions.saga.signup.request({
				...validState,
				// recaptchaToken: token,
			}));
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
			<DialogTitle id='dialog-title' className={stylesheet.dialogTitle}>SIGN UP</DialogTitle>
			<DialogContent>
				<DialogContentText id='dialog-description'>
					Sign up to participate in and contribute to the Forum, Groups and other parts of this site.
				</DialogContentText>
				{textFields.map((config) => (
					<ValidatedTextField
						key={config.name}
						config={config}
						eventHandlers={eventHandlers}
						selectors={selectors}
					/>
				))}
				<DialogContentText
					variant='body1'
					color='textSecondary'
					className={stylesheet.readTermsAndConditions}
				>
					Please read the
					<Link href='/TermsAndConditions' className={stylesheet.termsAndConditions} target='_blank'>
						Terms &amp; Conditions
					</Link>
					before continuing.
				</DialogContentText>
			</DialogContent>
			<DialogActions className={stylesheet.actionButtons}>
				<Button
					variant='contained'
					color='primary'
					onClick={onSignup}
				>
					I agree to the Terms &amp; Conditions - Sign me up
					{isAuthenticating && <CircularProgress size={24} className={stylesheet.signupProgress} />}
				</Button>
				<Button onClick={handleCloseDialog} color='primary'>Cancel</Button>
			</DialogActions>
			<DialogContent>
				{authenticationError !== null && renderErrors(authenticationError)}
			</DialogContent>
		</>
	);
}

registerModal('signUp', SignUpDialog);
