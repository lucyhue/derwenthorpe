// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

// components
import { BrandLogo } from '../BrandLogo';
import { useStyles } from './HeaderStyles';

export function Header({
	color,
	rightLinks,
	navItems,
	isFixed,
	isAbsolute,
}) {
	const stylesheet = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const appBarClasses = classNames({
		[stylesheet.appBar]: true,
		[stylesheet[color]]: color,
		[stylesheet.absolute]: isAbsolute,
		[stylesheet.fixed]: isFixed,
	});

	return (
		<AppBar className={appBarClasses}>
			<Toolbar className={stylesheet.container}>
				<Hidden smDown={true}>
					<BrandLogo />
				</Hidden>
				{navItems !== undefined && (
					<Hidden smDown={true} implementation='css' className={stylesheet.navItems}>
						{navItems}
					</Hidden>
				)}
				{rightLinks !== undefined && (
					<Hidden smDown={true} implementation='css'>
						{rightLinks}
					</Hidden>
				)}
				<Hidden mdUp={true}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
			<Hidden mdUp={true} implementation='js'>
				<Drawer
					variant='temporary'
					anchor='right'
					open={mobileOpen}
					stylesheet={{ paper: stylesheet.drawerPaper }}
					onClose={handleDrawerToggle}
				>
					<div className={stylesheet.appResponsive}>
						{navItems}
						{rightLinks}
					</div>
				</Drawer>
			</Hidden>
		</AppBar>
	);
}

Header.defaultProps = {
	color: 'white',
	rightLinks: null,
	navItems: null,
	isFixed: true,
	isAbsolute: false,
};

Header.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'info',
		'success',
		'warning',
		'danger',
		'transparent',
		'white',
		'rose',
		'dark',
	]),
	rightLinks: PropTypes.node,
	navItems: PropTypes.node,
	isFixed: PropTypes.bool,
	isAbsolute: PropTypes.bool,
};
