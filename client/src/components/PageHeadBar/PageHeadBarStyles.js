import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	headBarWrapper: {
		marginTop: '68px',
		padding: '0px 80px 5px 80px',
		zIndex: '12',
		backgroundColor: theme.palette.background.light,
		color: theme.palette.text.primary,
		borderRadius: '0px',
		boxShadow: 'none',
	},
	headBarContainer: {
		display: 'flex',
		flexDirection: 'row',
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
	headBarSub: {
		paddingLeft: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	subhead: {
		textTransform: 'uppercase',
		marginTop: '0px',
	},
	description: {
		marginTop: '0px',
	},
}));
