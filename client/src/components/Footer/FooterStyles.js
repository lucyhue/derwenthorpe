// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import { makeStyles } from '@material-ui/core/styles';
import { container, primaryColor } from '../MaterialKitReactStyles';

export const useStyles = makeStyles((theme) => ({
	block: {
		color: 'inherit',
		padding: '0.9375rem',
		fontWeight: '500',
		fontSize: '12px',
		textTransform: 'uppercase',
		borderRadius: '3px',
		textDecoration: 'none',
		position: 'relative',
		display: 'block',
	},
	left: {
		float: 'left!important',
		display: 'block',
	},
	right: {
		padding: '15px 0',
		margin: '0',
		float: 'right!important',
	},
	footer: {
		padding: '0.9375rem',
		width: '100%',
		textAlign: 'center',
		display: 'flex',
		backgroundColor: theme.palette.background.light,
		flexDirection: 'row',
		zIndex: '2',
		position: 'relative',
	},
	a: {
		color: 'primaryColor',
		textDecoration: 'none',
		backgroundColor: 'transparent',
	},
	footerWhiteFont: {
		'&,&:hover,&:focus': {
			color: '#FFFFFF',
		},
	},
	label: {
			color: '#555555',
	},
	container,
	container: {
		...container,
		minHeight: '50px',
		flex: '1',
		backgroundColor: theme.palette.background.light,
		alignItems: 'center',
		justifyContent: 'space-between',
		display: 'flex',
		flexWrap: 'nowrap',
	},
	list: {
		marginBottom: '0',
		padding: '0',
		marginTop: '0',
	},
	inlineBlock: {
		display: 'inline-block',
		padding: '0px',
		width: 'auto',
	},
	icon: {
		width: '18px',
		height: '18px',
		position: 'relative',
		top: '3px',
	},
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
		padding: '10px',
	},
	footerJRHT: {
		height: '36px',
		padding: '10px',
	},
	footerLinks: {
		flexDirection:'column',
		fontFamily: ['Roboto'],
		fontSize: '12px',
		'& > a': {
			display: 'flex',
			textDecoration: 'none',
			color: '#555555',
			fontSize: '12px',
		},
	},
		footerform: {
		flexDirection:'row',
		fontFamily: ['Roboto'],
		fontSize: '12px',
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
