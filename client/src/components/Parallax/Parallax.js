// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useStyles } from './ParallaxStyles';

export function Parallax({ filter, className, children, style, image, small }) {
	const classes = useStyles();

	let windowScrollTop;
	if (window.innerWidth >= 768) {
		windowScrollTop = window.pageYOffset / 3;
	} else {
		windowScrollTop = 0;
	}
	const [transform, setTransform] = React.useState(
		`translate3d(0,${windowScrollTop}px,0)`
	);
	const resetTransform = () => {
		const scrollTop = window.pageYOffset / 3;
		setTransform(`translate3d(0,${scrollTop}px,0)`);
	};
	useEffect(() => {
		if (window.innerWidth >= 768) {
			window.addEventListener('scroll', resetTransform);
		}
		return function cleanup() {
			if (window.innerWidth >= 768) {
				window.removeEventListener('scroll', resetTransform);
			}
		};
	});
	const parallaxClasses = classNames({
		[classes.parallax]: true,
		[classes.filter]: filter,
		[classes.small]: small,
		[className]: className !== undefined,
	});

	return (
		<div
			className={parallaxClasses}
			style={{
				...style,
				backgroundImage: `url(${image})`,
				transform,
			}}
		>
			{children}
		</div>
	);
}

Parallax.defaultProps = {
	className: '',
	filter: false,
	style: undefined,
	small: false,
};

Parallax.propTypes = {
	className: PropTypes.string,
	filter: PropTypes.bool,
	children: PropTypes.node.isRequired,
	style: PropTypes.string,
	image: PropTypes.string.isRequired,
	small: PropTypes.bool,
};
