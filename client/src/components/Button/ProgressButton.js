import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import { useStyles } from './ProgressButtonStyles';

export function ProgressButton({ buttonText, onClick, className, status, progressComponent: ProgressComponent, ...progressProps }) {
	const stylesheet = useStyles();

	const buttonClassName = classNames(className, {
		[stylesheet.buttonSuccess]: status.current === 'success',
	});

	const renderProgress = () => {

		if (status.progress === 0) {
			return null;
		}
		console.log('renderProgress ', status.progress);
		return (
			<ProgressComponent className={stylesheet.buttonProgress} {...progressProps} />
		);
	}

	return (
		<div className={stylesheet.buttonWrapper}>
			<Button
				variant='contained'
				className={buttonClassName}
				onClick={onClick}
			>
				{buttonText}
				{renderProgress()}
			</Button>
		</div>
	);
}

ProgressButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	status: PropTypes.shape({
		current: PropTypes.oneOf(['inactive', 'working', 'error', 'success']),
		error: PropTypes.string,
		progress: PropTypes.number,
	}).isRequired,
	progressComponent: PropTypes.shape({}).isRequired,
};

ProgressButton.defaultProps = {
	className: '',
}
