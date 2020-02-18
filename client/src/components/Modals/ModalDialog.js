import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { useStyles } from './ModalDialogStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

export function ModalDialog({ children }) {
	const stylesheet = useStyles();
	return (
		<Dialog
			open={true}
			TransitionComponent={Transition}
			aria-labelledby='dialog-title'
			PaperProps={{ className: stylesheet.dialogPaper }}
		>
			{children}
		</Dialog>
	);
}

ModalDialog.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
