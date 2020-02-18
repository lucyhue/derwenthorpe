import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	dialogTitle: {
		textTransform: 'uppercase',
		textAlign: 'center',
		color: theme.palette.grey[200],
	},
	forgotPassword: {
		color: theme.palette.text.link,
		cursor: 'pointer',
	},
	actionButtons: {
		justifyContent: 'space-between',
		padding: '20px',
	},
	signInButton: {
		width: '112px',
	},
	signinProgress: {
		marginLeft: theme.spacing(1),
	},
	authError: {
		marginTop: '0',
		color: theme.palette.error.main,
	},
}));
