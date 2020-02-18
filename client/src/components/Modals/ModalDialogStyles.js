// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		background: `linear-gradient(${theme.palette.background.dark}, ${theme.palette.background.light})`,
		margin: '48px',
		borderRadius: '24px',
	},
}));
