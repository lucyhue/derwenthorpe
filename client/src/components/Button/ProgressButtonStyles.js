import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonProgress: {
		color: theme.palette.highlight.main,
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	buttonSuccess: {
		'backgroundColor': theme.palette.highlight.success,
		'&:hover': {
			backgroundColor: theme.palette.highlight.success,
		},
	},
	buttonError: {
		'backgroundColor': theme.palette.error.main,
		'&:hover': {
			backgroundColor: theme.palette.error.main,
		},
	},

}));
