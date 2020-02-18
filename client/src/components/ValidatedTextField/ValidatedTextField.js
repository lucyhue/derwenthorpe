import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Popover from '@material-ui/core/Popover';
import FormHelperText from '@material-ui/core/FormHelperText';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// style
import { useStyles } from './ValidatedTextFieldStyles';

export function ValidatedTextField({ config, eventHandlers, selectors }) {

	const { name, type, label, helperText, autocomplete } = config;
	const { focus, change, blur } = eventHandlers;
	const { isValid, errors, value } = selectors;

	const stylesheet = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
	const handlePopoverClose = () => setAnchorEl(null);
	const isPopoverOpen = (anchorEl !== null);

	return (
		<FormControl
			fullWidth={true}
			error={!isValid(name)}
		>
			<InputLabel htmlFor={name}>{label}</InputLabel>
			<Input
				type={type}
				name={name}
				id={name}
				value={value(name)}
				onClick={focus}
				onChange={change}
				onBlur={blur}
				autoComplete={autocomplete}
				endAdornment={helperText &&
					<>
						<HelpOutlineIcon
							aria-owns={isPopoverOpen ? 'mouse-over-popover' : undefined}
							aria-haspopup='true'
							onMouseEnter={handlePopoverOpen}
							onMouseLeave={handlePopoverClose}
							fontSize='small'
						/>
						<Popover
							id='mouse-over-popover'
							className={stylesheet.popover}
							classes={{
								paper: stylesheet.paper,
							}}
							open={isPopoverOpen}
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'center',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'center',
								horizontal: 'left',
							}}
							onClose={handlePopoverClose}
							disableRestoreFocus={true}
						>
							{helperText}
						</Popover>
					</>
				}
			/>
			{!isValid(name) &&
				<FormHelperText id={`${name}-errors`}>{errors(name)}</FormHelperText>
			}
		</FormControl>
	);
}

ValidatedTextField.propTypes = {
	config: PropTypes.shape({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		helperText: PropTypes.string,
		autocomplete: PropTypes.string,
	}).isRequired,
	eventHandlers: PropTypes.shape({
		focus: PropTypes.func.isRequired,
		change: PropTypes.func.isRequired,
		blur: PropTypes.func.isRequired,
	}).isRequired,
	selectors: PropTypes.shape({
		isValid: PropTypes.func.isRequired,
		errors: PropTypes.func.isRequired,
		value: PropTypes.func.isRequired,
	}).isRequired,
}