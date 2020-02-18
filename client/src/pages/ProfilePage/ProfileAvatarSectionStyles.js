import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	editAvatarWrapper: {
		margin: '10px 0px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	avatarPreview: {
		height: '300px',
		margin: '5px 20px 5px 0px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
}));
