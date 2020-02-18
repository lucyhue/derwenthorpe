import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	pageContainer: {
		marginTop: '100px',
		paddingTop: '20px',
		zIndex: '12',
		color: theme.palette.text.primary,
	},
	title: {
		fontFamily: 'Kaushan Script',
		fontSize: '3rem',
		display: 'inline-block',
		position: 'relative',
		marginTop: '30px',
		minHeight: '32px',
		textDecoration: 'none',
	},
}));
