import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { LIGHT_THEME_KEY } from './appConstants';

export function appThemes() {
	return {
		[LIGHT_THEME_KEY]: createMuiTheme({
			palette: {
				background: {
					default: '#fafafa',
					main: '#aebe8c',
					light: '#e1ebcb',
					dark: '#7e8e5e',
				},
				primary: {
					main: '#4c88b8',
					light: '#7fb8ea',
					dark: '#095B88',
				},
				secondary: {
					main: '#f9c227',
					light: '#fff45f',
					dark: '#c29200',
				},
				highlight: {
					main: '#e1ebcb',
					success: '#aebe8c',
				},
				error: {
					main: '#b00020',
				},
				text: {
					primary: '#707070',
					link: blue[700],
				},
			},
			typography: {
				fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			},
			overrides: {
				MuiTypography: {
					body1: {
						marginTop: '1rem',
					},
				},
			},
		}),
	};
}
