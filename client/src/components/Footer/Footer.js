// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

// MUI
// import { List, ListItem } from '@material-ui/core';
// import Favorite from '@material-ui/icons/Favorite';

import { useStyles } from './FooterStyles';
import { BrandLogo } from '../BrandLogo';

export function Footer(props) {
	const classes = useStyles();
	const { whiteFont } = props;
	const footerClasses = classNames({
		[classes.footer]: true,
		[classes.footerWhiteFont]: whiteFont,
	});
	return (
		<footer className={footerClasses} >
					<BrandLogo />
				<div className={classes.JRHT}>
					<Link to='/'>
						<img className={classes.JRHT} src='jrht-logo.jpg' alt='JRHT logo'/>
					</Link>
				</div>
				<div className={classes.form}>
					<form>
						<label>
							Contact Us:
							<input type="text" name="name" placeholder="Name" />
							<input type="email" name="email" placeholder="Email Address" />
							<input type="message" name="message" placeholder="Message" />
						</label>
						<input type="submit" value="Submit" />
					</form>
				</div>
				<div className={classes.footerLinks}>
					<Link className={classes.footerLink} to='/TermsAndConditions'>Terms of Use</Link>
					<Link className={classes.footerLink} to='/PrivacyPolicy'>Privacy Policy</Link>
				</div>
				</footer>
	);
}

Footer.defaultProps = {
	whiteFont: false,
}

Footer.propTypes = {
	whiteFont: PropTypes.bool,
};
