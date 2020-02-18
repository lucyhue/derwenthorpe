import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// local
import { useStyles } from './PrivacyPolicyPageStyles';

export function PrivacyPolicyPage(props) {
	const stylesheet = useStyles();

	return (
		<Container maxWidth='sm' className={stylesheet.pageContainer}>
			<Typography variant='h1' className={stylesheet.title}>
				Privacy Policy
			</Typography>
			<Typography variant='body1' >
				This page presents the Privacy Policy for our website, www.derwenthorpe.co.uk.
				This Privacy Policy tells you what personal information we may collect from you,
				how we may share your personal information,
				and how you can limit our sharing of that information.
			</Typography>

			<Typography variant='h1' className={stylesheet.title}>
				Definitions
			</Typography>
			<Typography variant='body1' >
				“Non-Personal Information” (NPI) is information that is in no way personally identifiable
				and that is obtained automatically when you access our Website with a web browser.
			</Typography>
			<Typography variant='body1' >
				“Personally Identifiable Information” (PII) is non-public information that is
				personally identifiable to you and obtained so we can provide you with a product or service.
				PII may include information such as your name, email address, phone number,
				and other related information that you provide to us.
			</Typography>

			<Typography variant='h1' className={stylesheet.title}>
				Our Commitment to Your Privacy
			</Typography>
			<Typography variant='body1' >
				The Derwenthorpe Residents Association (DRA) is committed to the security and privacy
				of all our members.  We take your privacy seriously, and we will work with you
				to ensure that you have an enjoyable online experience.
				We recognize the need for appropriate protection and management of the PII you share with us.
				As a part of our commitment, this site conforms to GDPR regulations.
			</Typography>

			<Typography variant='h1' className={stylesheet.title}>
				Information We Collect
			</Typography>
			<Typography variant='body1' >
				Generally, you control the amount and type of information you provide to us when using our
				Website.  As a visitor to our Website, you can browse our Website to find out more about us.
				You are not required to provide us with any PII as a Visitor.
			</Typography>
			<Typography variant='body1' >
				However, if you register as a Member to use our Website, you must provide some PII in order
				for us to provide you with various features and/or functionality of our Website.
				We collect your PII in the following ways:
				<ul>
					<li>
						When you register for membership, we collect your name and email address
						and other incidental personal information.
					</li>
					<li>
						There may be online forms used in our Website and the information you enter into these online forms
						may contain PII.
					</li>
					<li>
						When you use our Website, we automatically collect certain information
						from the interaction of your mobile phone or web browser with our Website.
						Such information is typically considered NPI.
					</li>
					<li>
						Our Website may use “Cookies.” A Cookie is a small piece of data stored on your
						computer or mobile device by your web browser. We use Cookies to identify
						the areas of our Website that you have visited. We may also use Cookies to identify
						you as a Member so that you can access various parts or features of our Website.
						Finally, we may use Cookies to personalize the Content that you see on our Website.
						Most web browsers can be set to disable the use of Cookies.
						However, if you disable Cookies, you may not be able to access features on our Website correctly or at all.
						We never place PII in Cookies.
					</li>
					<li>
						When you post messages and other Member Content we record your identity
						alongside the posted material. This enables other Users to know who posted
						the material.
					</li>
				</ul>
			</Typography>

			<Typography variant='h1' className={stylesheet.title}>
				How Your Information Is Used
			</Typography>
			<Typography variant='body1' >
				We may use the PII you provide to us along with any computer information we receive
				to provide our Website to you as well as to make improvements to it.
			</Typography>
			<Typography variant='body1' >
				When we communicate with you about our Website, we will use the email address
				you provided when registering as a Member.
				We may also send you Website alerts regarding your use of our Website.
			</Typography>
			<Typography variant='body1' >
				We do not sell, rent, or otherwise provide your PII to third parties for any purposes.
			</Typography>

			<Typography variant='h1' className={stylesheet.title}>
				Your Rights
			</Typography>
			<Typography variant='body1' >
				Generally, you control the amount and type of information you provide to us when using our
				Website.  As a visitor to our Website, you can browse our Website to find out more about us.
				You are not required to provide us with any PII as a Visitor.
			</Typography>
			<Typography variant='body1' >
				You can request a copy of your PII we hold. We will endeavour to provide this information
				within a reasonable timeframe.
			</Typography>
			<Typography variant='body1' >
				You may change your PII at any time using facilities found on our Website.
				If you need assistance with updating your PII or removing yourself from mailing lists,
				or notification mechanisms, just send us an email with your request or
				contact us using the Contact us information found on our Website.
			</Typography>
			<Typography variant='body1' >
				You may choose to cancel your membership of our Website. When you do so your PII
				will be deleted from our records. If you elect to be &quot;forgotten&quot; this will include
				deletion of messages or other material you posted.
			</Typography>
		</Container>
	);
}
