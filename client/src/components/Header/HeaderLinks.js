// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';

// MUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { CloudDownload } from '@material-ui/icons';

// core components
import { CustomButton } from '../CustomButton';
import { useStyles } from './HeaderLinksStyles';

export function HeaderLinks(props) {
	const classes = useStyles();
	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<CustomButton
					href='https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar'
					color='transparent'
					target='_blank'
					className={classes.navLink}
				>
					<CloudDownload className={classes.icons} /> Download
				</CustomButton>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Tooltip
					id='instagram-twitter'
					title='Follow us on twitter'
					placement={window.innerWidth > 959 ? 'top' : 'left'}
					classes={{ tooltip: classes.tooltip }}
				>
					<CustomButton
						href='https://twitter.com/CreativeTim?ref=creativetim'
						target='_blank'
						color='transparent'
						className={classes.navLink}
					>
						<i className={`${classes.socialIcons} fab fa-twitter`} />
					</CustomButton>
				</Tooltip>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Tooltip
					id='instagram-facebook'
					title='Follow us on facebook'
					placement={window.innerWidth > 959 ? 'top' : 'left'}
					classes={{ tooltip: classes.tooltip }}
				>
					<CustomButton
						color='transparent'
						href='https://www.facebook.com/CreativeTim?ref=creativetim'
						target='_blank'
						className={classes.navLink}
					>
						<i className={`${classes.socialIcons} fab fa-facebook`} />
					</CustomButton>
				</Tooltip>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Tooltip
					id='instagram-tooltip'
					title='Follow us on instagram'
					placement={window.innerWidth > 959 ? 'top' : 'left'}
					classes={{ tooltip: classes.tooltip }}
				>
					<CustomButton
						color='transparent'
						href='https://www.instagram.com/CreativeTimOfficial?ref=creativetim'
						target='_blank'
						className={classes.navLink}
					>
						<i className={`${classes.socialIcons} fab fa-instagram`} />
					</CustomButton>
				</Tooltip>
			</ListItem>
		</List>
	);
}
