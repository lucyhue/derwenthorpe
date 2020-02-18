// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import Grid from '@material-ui/core/Grid';

import { useStyles } from './GridContainerStyles';

export function GridContainer(props) {
	const classes = useStyles();
	const { children, className, ...rest } = props;
	return (
		<Grid container={true} {...rest} className={`${classes.grid} ${className}`}>
			{children}
		</Grid>
	);
}

GridContainer.defaultProps = {
	className: '',
};

GridContainer.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
