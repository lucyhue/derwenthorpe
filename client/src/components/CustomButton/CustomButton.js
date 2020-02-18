// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { useStyles } from './CustomButtonStyles';

export const CustomButton = forwardRef((props, ref) => {
	const {
		color,
		round,
		children,
		fullWidth,
		disabled,
		simple,
		size,
		block,
		link,
		justIcon,
		className,
		...rest
	} = props;

	const classes = useStyles();

	const btnClasses = classNames({
		[classes.button]: true,
		[classes[size]]: size,
		[classes[color]]: color,
		[classes.round]: round,
		[classes.fullWidth]: fullWidth,
		[classes.disabled]: disabled,
		[classes.simple]: simple,
		[classes.block]: block,
		[classes.link]: link,
		[classes.justIcon]: justIcon,
		[className]: className,
	});
	return (
		<Button {...rest} ref={ref} className={btnClasses}>
			{children}
		</Button>
	);
});

CustomButton.defaultProps = {
	size: 'sm',
	simple: true,
	round: true,
	fullWidth: false,
	disabled: false,
	block: false,
	link: false,
	justIcon: false,
	className: '',
};

CustomButton.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'info',
		'success',
		'warning',
		'danger',
		'rose',
		'white',
		'facebook',
		'twitter',
		'google',
		'github',
		'transparent',
	]).isRequired,
	size: PropTypes.oneOf(['sm', 'lg']),
	simple: PropTypes.bool,
	round: PropTypes.bool,
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
	link: PropTypes.bool,
	justIcon: PropTypes.bool,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
