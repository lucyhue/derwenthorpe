// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React, { useState } from 'react';
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

	const stylesheet = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<footer className={footerClasses} >
			<div className={stylesheet.container} >
					<BrandLogo />
				<div className={classes.footerfooterJRHT}>
					<Link to='/'>
						<img className={classes.footerJRHT} src='JRHT-logo.jpg' alt='JRHT logo'/>
					</Link>
				</div>
				<div className={classes.footerform}>
					<form>
						<label className={classes.label}>
							Contact Us:
							<input type="text" name="name" placeholder="Name" />
							<input type="email" name="email" placeholder="Email Address" />
							<input type="message" name="message" placeholder="Message" />
						</label>
						<input type="submit" value="Submit" />
					</form>
				</div>
				<div className={classes.footerLinks}>
					<Link to='/TermsAndConditions'>Terms of Use</Link>
					<Link to='/PrivacyPolicy'>Privacy Policy</Link>
				</div>
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
