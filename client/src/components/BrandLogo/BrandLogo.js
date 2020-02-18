import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './BrandLogoStyles';

export function BrandLogo() {
	const classes = useStyles();
	return (
		<div className={classes.brandLogo}>
			<Link to='/'>
				<img className={classes.brandIcon} src='brand-logo.png' alt='app icon' />
			</Link>
			<div className={classes.brandText}>
				<Typography
					className={classes.brandName}
					align='left'
					display='block'
				>
					DERWENTHORPE
				</Typography>
				<Typography
					className={classes.brandStrap}
					align='left'
					display='block'
				>
					A Living Community
				</Typography>
			</div>
		</div>
	);
}
