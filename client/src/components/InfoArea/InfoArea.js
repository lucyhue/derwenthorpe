// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useStyles } from './InfoAreaStyles';

export function InfoArea(props) {
	const classes = useStyles();
	const { title, description, iconColor, vertical } = props;
	const iconWrapper = classNames({
		[classes.iconWrapper]: true,
		[classes[iconColor]]: true,
		[classes.iconWrapperVertical]: vertical,
	});
	const iconClasses = classNames({
		[classes.icon]: true,
		[classes.iconVertical]: vertical,
	});
	return (
		<div className={classes.infoArea}>
			<div className={iconWrapper}>
				<props.icon className={iconClasses} />
			</div>
			<div className={classes.descriptionWrapper}>
				<h4 className={classes.title}>{title}</h4>
				<p className={classes.description}>{description}</p>
			</div>
		</div>
	);
}

InfoArea.defaultProps = {
	iconColor: 'gray',
	vertical: false,
};

InfoArea.propTypes = {
	icon: PropTypes.shape({}).isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	iconColor: PropTypes.oneOf([
		'primary',
		'warning',
		'danger',
		'success',
		'info',
		'rose',
		'gray',
	]),
	vertical: PropTypes.bool,
};
