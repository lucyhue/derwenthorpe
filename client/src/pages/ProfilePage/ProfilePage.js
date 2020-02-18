import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

// MUI
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';

// local
import { authSelectors } from 'user/auth';
import { PageHeadBar } from 'components/PageHeadBar/PageHeadBar';
import { ProfileSection } from './ProfileSection';
import { ProfileAvatarSection } from './ProfileAvatarSection';
import { useStyles } from './ProfilePageStyles';

export function ProfilePage() {
	const user = useSelector(authSelectors.user.currentUser);
	const stylesheet = useStyles();
	const { uniqueName, createdOn } = user;
	const formattedStartDate = moment(createdOn).format('Do MMMM YYYY');

	return (
		<>
			<PageHeadBar
				title='Profile'
				subhead={uniqueName}
				description={`Member since ${formattedStartDate}`}
			/>
			<Container maxWidth='sm' className={stylesheet.pageContainer}>
				<ProfileSection title='Profile photo:' >
					<ProfileAvatarSection user={user} />
				</ProfileSection>
				<ProfileSection title='Name:' >
					Some content
				</ProfileSection>
				<ProfileSection title='Email Address:' >
					Some content
				</ProfileSection>
				<ProfileSection title='Password:' >
					Some content
				</ProfileSection>
				<ProfileSection title='Groups you are a member of:' >
					Some content
				</ProfileSection>
				<ProfileSection title='Form topics you subscribe to:' >
					Some content
				</ProfileSection>
				<ProfileSection title='Notify me about:' >
					Some content
				</ProfileSection>
				<ProfileSection title='Notify me when:' >
					Some content
				</ProfileSection>
			</Container>
		</>
	);
}
