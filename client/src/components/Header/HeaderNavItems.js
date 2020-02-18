import React from 'react';
import { NavLink } from 'react-router-dom';

// MUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// core components
import { HeaderAuthItems } from './HeaderAuthItems';
import { useStyles } from './HeaderNavItemStyles';

export function HeaderNavItems() {
	const classes = useStyles();

	const renderNavItems = () => {
		const topPages = [
			{ id: 'home', title: 'Home', to: '/', tooltip: 'Welcome and overview of Derwenthorpe' },
			{ id: 'calendar', title: 'Calendar', to: '/calendar', tooltip: 'what\'s happening' },
			{ id: 'news', title: 'News', to: '/news', tooltip: 'what\'s happened' },
			{ id: 'forum', title: 'Forum', to: '/forum', tooltip: 'a place to chat about stuff' },
			{ id: 'groups', title: 'Groups', to: '/groups', tooltip: 'a space for groups to get organised' },
			{ id: 'docs', title: 'Docs', to: '/docs', tooltip: 'documents, information, FAQ and more' },
		];

		return topPages.map((pageInfo) => {
			return (
				<ListItem key={pageInfo.id} className={classes.listItem}>
					<NavLink className={classes.navLink} to={pageInfo.to} >
						{pageInfo.title}
					</NavLink>
				</ListItem >
			);
		});
	};

	return (
		<>
			<List className={classes.list}>
				{renderNavItems()}
			</List>
			<List className={classes.list}>
				<HeaderAuthItems />
			</List>
		</>
	);
}
