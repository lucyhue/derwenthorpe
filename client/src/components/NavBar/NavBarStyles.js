// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	topNav: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.palette.common.white,
	},
	toolbar: {
		alignItems: 'row',
		width: '100%',
	},
	button: {
		'margin': theme.spacing(3),
		'color': theme.palette.text.primary,
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
}));
