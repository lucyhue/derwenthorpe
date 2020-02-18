import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	pageContainer: {
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
	listIcon: {
		alignSelf: 'flex-start',
		paddingTop: '0.4rem',
	},
}));
