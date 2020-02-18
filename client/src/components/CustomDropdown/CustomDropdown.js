// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// MUI
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';

// core components
import { CustomButton } from '../CustomButton';
import { useStyles } from './CustomDropdownStyles';

export function CustomDropdown(props) {
	const {
		children,
		dropdownList,
		dropup,
		dropdownHeader,
		caret,
		hoverColor,
		left,
		rtlActive,
		noLiPadding,
	} = props;

	const [anchorEl, setAnchorEl] = useState(null);
	const classes = useStyles();

	const handleOpenMenu = (event) => {
		if (anchorEl && anchorEl.contains(event.target)) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleCloseMenu = (param) => {
		setAnchorEl(null);
		if (props && props.onClick) {
			props.onClick(param);
		}
	};

	const handleCloseMenuAway = (event) => {
		if (anchorEl.contains(event.target)) {
			return;
		}
		setAnchorEl(null);
	};

	const caretClasses = classNames({
		[classes.caret]: true,
		[classes.caretActive]: Boolean(anchorEl),
		[classes.caretRTL]: rtlActive,
	});

	const dropdownItem = classNames({
		[classes.dropdownItem]: true,
		[classes[`${hoverColor}Hover`]]: true,
		[classes.noLiPadding]: noLiPadding,
		[classes.dropdownItemRTL]: rtlActive,
	});

	let placement = '';
	if (dropup) {
		placement = left ? 'top-start' : 'top';
	} else {
		placement = left ? 'bottom-start' : 'bottom';
	}

	return (
		<div>
			<div>
				<CustomButton
					aria-label='Notifications'
					aria-owns={anchorEl ? 'menu-list' : null}
					aria-haspopup='true'
					onClick={handleOpenMenu}
					color='primary'
				>
					{children}
					{caret ? <b className={caretClasses} /> : null}
				</CustomButton>
			</div>
			<Popper
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				transition={true}
				disablePortal={true}
				placement={placement}
				className={classNames({
					[classes.popperClose]: !anchorEl,
					[classes.popperResponsive]: true,
				})}
			>
				{() => (
					<Grow
						in={Boolean(anchorEl)}
						id='menu-list'
						style={
							dropup
								? { transformOrigin: '0 100% 0' }
								: { transformOrigin: '0 0 0' }
						}
					>
						<Paper className={classes.dropdown}>
							<ClickAwayListener onClickAway={handleCloseMenuAway}>
								<MenuList
									role='menu'
									className={classes.menuList}
								>
									{dropdownHeader !== undefined ? (
										<MenuItem
											onClick={() => handleCloseMenu(dropdownHeader)}
											className={classes.dropdownHeader}
										>
											{dropdownHeader}
										</MenuItem>
									) : null}
									{dropdownList.map((prop, key) => {
										if (prop.divider) {
											return (
												<Divider
													key={key}
													onClick={() => handleCloseMenu('divider')}
													className={classes.dropdownDividerItem}
												/>
											);
										}
										return (
											<MenuItem
												key={key}
												onClick={() => handleCloseMenu(prop)}
												className={dropdownItem}
											>
												{prop}
											</MenuItem>
										);
									})}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}

CustomDropdown.defaultProps = {
	hoverColor: 'primary',
	dropup: false,
	dropdownHeader: undefined,
	rtlActive: false,
	caret: false,
	left: false,
	noLiPadding: false,
};

CustomDropdown.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	hoverColor: PropTypes.oneOf([
		'black',
		'primary',
		'info',
		'success',
		'warning',
		'danger',
		'rose',
	]),
	dropdownList: PropTypes.arrayOf(PropTypes.any).isRequired,
	dropup: PropTypes.bool,
	dropdownHeader: PropTypes.node,
	rtlActive: PropTypes.bool,
	caret: PropTypes.bool,
	left: PropTypes.bool,
	noLiPadding: PropTypes.bool,
	// function that retuns the selected item
	onClick: PropTypes.func.isRequired,
};
