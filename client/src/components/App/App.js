import React, { createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import { AuthRoute } from 'components/AuthRoute';
import { Header } from 'components/Header';
import { HeaderNavItems } from 'components/Header/HeaderNavItems';
import { Footer } from 'components/Footer/Footer';

// pages
import { LandingPage } from 'pages/LandingPage';
import { TermsAndConditionsPage } from 'pages/TermsAndConditionsPage';
import { PrivacyPolicyPage } from 'pages/PrivacyPolicyPage';
import { ProfilePage } from 'pages/ProfilePage';

export const ModalContext = createContext();

export const App = () => {

	return (
		<BrowserRouter >
			<Header
				navItems={<HeaderNavItems />}
				fixed={true}
			/>
			<Switch >
				<AuthRoute path='/profile' >
					<ProfilePage />
				</AuthRoute>
				<Route path='/TermsAndConditions' >
					<TermsAndConditionsPage />
				</Route>
				<Route path='/PrivacyPolicy' >
					<PrivacyPolicyPage />
				</Route>
				<Route path='/' >
					<LandingPage />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};
