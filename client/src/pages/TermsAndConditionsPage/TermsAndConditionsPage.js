import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

// local
import { PageHeadBar } from 'components/PageHeadBar/PageHeadBar';
import { useStyles } from './TermsAndConditionsPageStyles';

export function TermsAndConditionsPage(props) {
	const stylesheet = useStyles();

	return (
		<>
			<PageHeadBar
				title='Terms And Conditions'
			/>
			<Container maxWidth='sm' className={stylesheet.pageContainer}>
				<Typography variant='body1' >
					This web page presents the Terms and Conditions (Agreement) for our website, www.derwenthorpe.co.uk (Website).
					By using our Website, you agree to fully comply with and be bound by the following Agreement
					each time you use our Website.  Please review the following terms carefully.
				</Typography>

				<Typography variant='h1' className={stylesheet.title}>
					Our Services
				</Typography>
				<Typography variant='body1' >
					Our Website offers the following services: a calendar of events,
					written descriptions of news and events,
					a forum where Members can discuss topics of interest,
					a space where groups can communicate and organise themselves,
					an archive of documents (Services).
				</Typography>

				<Typography variant='h1' className={stylesheet.title}>
					Definitions
				</Typography>
				<Typography variant='body1' >
					The terms “us” or “we” or “our” refers to the Derwenthorpe Residents Association (DRA), the owner of this Website.
					A “Visitor” is someone that merely browses our Website.
					A “Member” is someone who has registered with our Website to use our Services.
					The term “User” is a collective identifier that refers to either a Visitor or a Member.
				</Typography>
				<Typography variant='body1' >
					All text, information, graphics, design, and data offered through our Website or Services,
					whether produced by our Members or by us, are collectively known as our “Content”.
					We distinguish content posted by our Members as “Member Content”.
				</Typography>

				<Typography variant='h1' className={stylesheet.title}>
					Acceptance of Agreement
				</Typography>
				<Typography variant='body1' >
					This Agreement is between you and The Derwenthorpe Residents Association.
					USING, ACCESSING AND/OR BROWSING OUR WEBSITE CONSTITUTES ACCEPTANCE OF THESE TERMS AND CONDITIONS.
				</Typography>

				<Typography variant='h1' className={stylesheet.title}>
					Member Conduct
				</Typography>
				<Typography variant='body1' >
					Members may post their own content to our Website through our Services (Member Content).
				</Typography>
				<Typography variant='body1' >
					As a Member, you agree not to use our Services to
					upload or post any Member Content that:
				</Typography>
				<List>
					<ListItem>
						<ListItemIcon className={stylesheet.listIcon} ><CloseIcon /></ListItemIcon>
						<ListItemText variant='body1' >
							harms, threatens, defames, promotes violence or illegal activities,
							or is otherwise vulgar, obscene, abusive, harassing, tortuous, libelous,
							invasive of another’s privacy, hateful, or racially, ethically
							or otherwise objectionable.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon className={stylesheet.listIcon} ><CloseIcon /></ListItemIcon>
						<ListItemText variant='body1' >
							contains software viruses or any other computer code, files or programs designed to interrupt,
							destroy or limit the functionality of any computer software or hardware or telecommunications equipment,
							or to extract information from our Website or Services.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon className={stylesheet.listIcon} ><CloseIcon /></ListItemIcon>
						<ListItemText variant='body1' >
							contains any unsolicited or unauthorized advertising, solicitations,
							promotional materials, junk mail, spam, chain letters,
							pyramid schemes, or any other form of solicitation.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon className={stylesheet.listIcon} ><CloseIcon /></ListItemIcon>
						<ListItemText variant='body1' >
							violates any local, national, or international laws.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon className={stylesheet.listIcon} ><CloseIcon /></ListItemIcon>
						<ListItemText variant='body1' >
							does not respect any patent, trademark, trade secret,
							copyright or other proprietary rights of any party.
						</ListItemText>
					</ListItem>
				</List>

				<Typography variant='h1' className={stylesheet.title}>
					Our Response To Violations
				</Typography>
				<Typography variant='body1' >
					We are not responsible for the monitoring or filtering of any Member content.
					If any Member Content is reported to us as being offensive or inappropriate,
					we may ask the Member to retract or otherwise modify the questionable content
					within 24 hours of being notified by us.
					Should the Member fail to meet such a request, we may either
					restrict the Member’s ability to post Member Content OR
					terminate their membership, without further notification to the Member.
				</Typography>
				<Typography variant='body1' >
					We have sole discretion to remove any Member Content that violates this Agreement
					or is otherwise objectionable.
				</Typography>
				<Typography variant='body1' >
					Should any Member Content be found illegal, we will submit all necessary
					information to the proper authorities.
					We may suspend or terminate Membership of anyone whom we deem
					to be infringing other’s intellectual property rights.
				</Typography>

				<Typography variant='h1' className={stylesheet.title}>
					Privacy Policy
				</Typography>
				<Typography variant='body1' >
					Our Privacy Policy is considered part of this Agreement.
				</Typography>
			</Container>
		</>
	);
}
