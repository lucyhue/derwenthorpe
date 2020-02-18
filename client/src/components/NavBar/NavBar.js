// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// App
import { authSelectors } from 'user/auth';
import { BrandLogo } from '../BrandLogo';
import { SignInButton } from '../SignInButton';
import { useStyles } from './NavBarStyles';

export function NavBar() {
	const isAuthenticated = useSelector(authSelectors.user.isAuthenticated);
	const classes = useStyles();

	const renderNavLinks = () => {
		const topPages = [
			{ title: 'Home', to: '/' },
			{ title: 'Calendar', to: '/calendar' },
			{ title: 'News', to: '/news' },
			{ title: 'Forum', to: '/forum' },
			{ title: 'Groups', to: '/groups' },
			{ title: 'Docs', to: '/docs' },
		];

		return topPages.map((pageInfo) => {
			return (
				<Typography
					key={pageInfo.title}
					className={classes.button}
					component={Link}
					to={pageInfo.to}
				>
					{pageInfo.title}
				</Typography>
			);
		});
	};

	const renderAuthLinks = () => {
		if (!isAuthenticated) {
			return <SignInButton />;
			// } else {
			//     return (
			//         <>
			//             <UserIdentity />
			//             <AlertsButton />
			//         </>
			//     );
		}
		return null;
	};

	return (
		<AppBar className={classes.topNav} position='static'>
			<BrandLogo />
			<Toolbar variant='dense' className={classes.toolbar}>
				{renderNavLinks()}
				{renderAuthLinks()}
			</Toolbar>
		</AppBar>
	);
}
