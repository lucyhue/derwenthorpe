// copied from Material Kit React (https://demos.creative-tim.com/material-kit-react)

import React from 'react';

// app
import { Parallax } from 'components/Parallax/Parallax';
import hero1 from 'assets/img/hero-1.jpg'

// local
// import { AboutSection } from './Sections/AboutSection';
// import MapSection from './Sections/MapSection';
// import OnBoardingSection from './Sections/OnBoardingSection';
//  <MapSection />
//  <OnBoardingSection />
import { useStyles } from './LandingPageStyles';

export function LandingPage(props) {
	const classes = useStyles();

	return (
		<div>
			<Parallax filter={false} image={hero1} >
				<div className={classes.welcomeTitle}>
					<h1>
						Welcome To Derwenthorpe
					</h1>
				</div>
			</Parallax>
		</div>
	);
}
