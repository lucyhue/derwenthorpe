import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useStyles } from './UserAvatarStyles';

export function UserAvatar({ fullName, uniqueName, avatarUrl, size, onClick, className }) {
	const stylesheet = useStyles();
	const classNames = `${stylesheet.avatar} ${className}`

	if (avatarUrl) {
		return (
			<Avatar
				alt={fullName}
				src={avatarUrl}
				className={classNames}
				onClick={onClick}
				size={size}
			/>
		);
	} else {
		const iconSize = `${size}px`;
		const iconStyle = {
			width: iconSize,
			height: iconSize,
		}
		return (
			<AccountCircleIcon style={iconStyle} />
		);
	}

}

UserAvatar.propTypes = {
	avatarUrl: PropTypes.string,
	fullName: PropTypes.string,
	size: PropTypes.number,
	onClick: PropTypes.func,
	className: PropTypes.string,
};

UserAvatar.defaultProps = {
	avatarUrl: null,
	fullName: '',
	size: 4,
	onClick: null,
	className: '',
};
