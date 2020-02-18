
export const authSelectors = {

	user: {
		currentUser: (state) => state.auth.user,
		currentUserId: (state) => state.auth.user.uid,
		isAuthenticating: (state) => state.auth.isAuthenticating,
		isAuthenticated: (state) => state.auth.user !== null,
		isLoading: (state) => state.auth.isLoading,
		authenticationError: (state) => state.auth.error,
	},

};
