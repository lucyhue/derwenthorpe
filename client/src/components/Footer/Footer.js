// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// MUI
// import { List, ListItem } from '@material-ui/core';
// import Favorite from '@material-ui/icons/Favorite';

import { useStyles } from './FooterStyles';

export function Footer(props) {
	const classes = useStyles();
	const { whiteFont } = props;
	const footerClasses = classNames({
		[classes.footer]: true,
		[classes.footerWhiteFont]: whiteFont,
	});
	return (
		<footer className={footerClasses} />
	);
}

Footer.defaultProps = {
	whiteFont: false,
}

Footer.propTypes = {
	whiteFont: PropTypes.bool,
};
