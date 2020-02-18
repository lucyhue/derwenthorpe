import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
	return {
		dialogTitle: {
			textTransform: 'uppercase',
			textAlign: 'center',
			color: theme.palette.grey[200],
		},
		readTermsAndConditions: {
			margin: '2rem 0 0 0',
		},
		termsAndConditions: {
			color: theme.palette.text.link,
			cursor: 'pointer',
			marginTop: '16px',
			fontSize: '1rem',
		},
		actionButtons: {
			justifyContent: 'space-between',
			padding: '20px',
		},
		signupProgress: {
			color: theme.palette.secondary.light,
			marginLeft: theme.spacing(1),
		},
		authError: {
			marginTop: '0',
			color: theme.palette.error.main,
		},
	};
});
