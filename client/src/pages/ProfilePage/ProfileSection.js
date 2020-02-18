import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// local
import { useStyles } from './ProfileSectionStyles';

export function ProfileSection({ title, children }) {
	const stylesheet = useStyles();

	return (
		<>
			<Typography className={stylesheet.title} >{title}</Typography>
			{children}
			<Divider />
		</>
	);
}

ProfileSection.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
