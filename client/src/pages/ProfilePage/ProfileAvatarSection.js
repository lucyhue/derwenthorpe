import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import { useDispatch } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { ProgressButton } from 'components/Button/ProgressButton';
import { authActions } from 'user/auth/authActions';
import { UserAvatar } from 'components/UserAvatar/UserAvatar';
import { useStyles } from './ProfileAvatarSectionStyles';

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => { return item.trim() })

export function ProfileAvatarSection({ user }) {
	const [avatar, setAvatar] = useState({
		preview: null,
		src: null,
	})
	const [status, setStatus] = useState({
		current: 'inactive', // inactive, working, error, success
		progress: 0,
		errorMessage: '',
	});
	const stylesheet = useStyles();
	const dispatch = useDispatch();

	const verifyFile = (file) => {
		const fileType = file.type
		const fileSize = file.size
		if (fileSize > imageMaxSize) {
			console.error(`This file is not allowed. ${fileSize} bytes is too large`)
			return false;
		}
		if (!acceptedFileTypesArray.includes(fileType)) {
			console.error('This file is not allowed. Only images are allowed.')
			return false;
		}
		return true;
	}

	const handleSelectFile = (e) => {
		const file = (e.target.files && e.target.files.length > 0) ? e.target.files[0] : null;
		if (file && !verifyFile(file)) {
			e.target.value = '';
		};
	}

	const handleClose = () => {
		setAvatar({ preview: null })
	}

	const handleCrop = (preview) => {
		setAvatar({ preview })
	}

	const handleSetAvatar = () => {
		if (status.current !== 'inactive') {
			return;
		}
		dispatch(authActions.saga.setAvatar.request({ user, avatar: avatar.preview, status, setStatus }));
	}

	return (
		<>
			<Typography variant='body1'>
				A profile photo that shows your face can help other members get to know you.
				If you haven't saved a photo you are represented by a random, but unique, 'identicon'.
				You can use this section to select and crop a suitable photo.
			</Typography>
			<div className={stylesheet.editAvatarWrapper}>
				{avatar.preview &&
					<div className={stylesheet.avatarPreview}>
						<img src={avatar.preview} alt='Preview' width={217} />
						<ProgressButton
							buttonText='Save As My Photo'
							onClick={handleSetAvatar}
							status={status}
							progressComponent={LinearProgress}
							variant='determinate'
							value={status.progress}
						/>
					</div>
				}
				{!avatar.preview &&
					<UserAvatar user={user} size={217} />
				}
				<Avatar
					width={300}
					imageWidth={300}
					height={220}
					onCrop={handleCrop}
					onClose={handleClose}
					onBeforeFileLoad={handleSelectFile}
					src={avatar.src}
					mimeTypes={acceptedFileTypes}
					label='Click to select a photo'
				/>
			</div>
		</>
	)

}

ProfileAvatarSection.propTypes = {
	user: PropTypes.shape({}).isRequired,
};
