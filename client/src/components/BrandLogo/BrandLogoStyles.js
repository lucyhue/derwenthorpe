import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	brandLogo: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: '300px',
		fontFamily: ['Roboto', 'sans-serif'],
		textDecoration: 'none',
		color: '#707070',
	},
	brandIcon: {
		height: '48px',
	},
	brandText: {
		marginLeft: theme.spacing(1),
		flexDirection: 'column',
	},
	brandName: {
		fontWeight: '700',
		fontSize: '1rem',
		letterSpacing: '0.2rem',
		marginTop: theme.spacing(0.8),
	},
	brandStrap: {
		fontSize: '0.84rem',
		fontWeight: '700',
		color: '#CAE0AC',
		letterSpacing: '0.15rem',
		marginTop: theme.spacing(-0.8),
	},
}));
