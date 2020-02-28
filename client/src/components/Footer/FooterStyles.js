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
			gridArea: 'box1',
			padding: '5px',
	},
	formName: {
			color: '#555555',
			gridArea: 'box2',
			backgroundColor: '#CAE0AC',
	},
	formEmail: {
			color: '#555555',
			gridArea: 'box6',
			backgroundColor: '#CAE0AC',
	},
	formMessage: {
			color: '#555555',
			gridArea: 'box3',
			backgroundColor: '#CAE0AC',
			paddingBottom: '25px',
	},
	formSubmit: {
			color: '#555555',
			gridArea: 'box8',
	},
	icon: {
			color: 'action',
			gridArea: 'box8',
	},
	MuiSvgIconRoot: {
    fill: 'blue',
    width: '1em',
    height: '1em',
    display: 'inlineBlock',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: '0',
    userSelect: 'none',
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
containergrid: {
	  fontSize: '12px',
	  width: '100%',
	  background: 'transparent',
		display: 'grid',
		gridTemplateColumns: 'auto 160px 160px 50px',
		gridTemplateRows: '25px 25px',
		gridTemplateAreas: `
                    'box1 box2 box3 box4'
                    'box5 box6 box3 box8'
                `
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
		width: '237.5px',
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
			padding: '5px',
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
