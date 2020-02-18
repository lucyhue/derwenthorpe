import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
	return {
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			padding: theme.spacing(1),
			backgroundColor: theme.palette.background.light,
			fontFamily: theme.typography.fontFamily,
			maxWidth: '20rem',
		},
	};
});
