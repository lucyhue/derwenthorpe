import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { appSelectors } from './appSelectors';

export function AppThemeProvider({ children }) {
	const theme = useSelector(appSelectors.theme.currentTheme);
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

AppThemeProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
