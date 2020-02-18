// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';

import { useStyles } from './GridItemStyles';

export function GridItem(props) {
	const classes = useStyles();
	const { children, className, ...rest } = props;
	return (
		<Grid item={true} {...rest} className={`${classes.grid} ${className}`}>
			{children}
		</Grid>
	);
}

GridItem.defaultProps = {
	className: '',
};

GridItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
