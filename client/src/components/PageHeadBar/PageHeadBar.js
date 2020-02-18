import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './PageHeadBarStyles';

export function PageHeadBar({ title, subhead, description, children }) {
	const stylesheet = useStyles();

	return (
		<div className={stylesheet.headBarWrapper}>
			<Container maxWidth='sm' className={stylesheet.headBarContainer}>
				<Typography variant='body1' className={stylesheet.title}>{title}</Typography>
				<Box className={stylesheet.headBarSub}>
					{subhead && <Typography variant='body1' className={stylesheet.subhead}>{subhead}</Typography>}
					{description && <Typography variant='body1' className={stylesheet.description}>{description}</Typography>}
				</Box>
				{children}
			</Container>
		</div>
	);
}

PageHeadBar.propTypes = {
	title: PropTypes.string.isRequired,
	subhead: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

PageHeadBar.defaultProps = {
	subhead: '',
	description: '',
	children: null,
};
